"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jimp_1 = __importDefault(require("jimp"));
const MathHelper_1 = __importDefault(require("../../helpers/MathHelper"));
const ColorHelper_1 = __importDefault(require("../../helpers/ColorHelper"));
const Point_1 = __importDefault(require("./Point"));
class JimpImage {
    constructor(jimp, scale = 1) {
        this.jimpImage = jimp;
        this.width = jimp.getWidth();
        this.height = jimp.getHeight();
        this.scale = scale;
    }
    get image() {
        return this.jimpImage;
    }
    getColorWithThreshold(point, threshold) {
        let { xMin, xMax, yMin, yMax } = this.getPointsWithThreshold(point, threshold);
        let sum = 0, iterations = 0;
        for (let xx = xMin; xx <= xMax; xx++) {
            for (let yy = yMin; yy <= yMax; yy++, iterations++) {
                sum += this.getColorOnPosition(new Point_1.default(xx, yy));
            }
        }
        return sum / iterations;
    }
    getPointsWithThreshold(point, threshold) {
        return {
            xMin: Math.round(MathHelper_1.default.clamp(point.x - threshold, this.width)),
            yMin: Math.round(MathHelper_1.default.clamp(point.y - threshold, this.height)),
            yMax: Math.round(MathHelper_1.default.clamp(point.y + threshold, this.height)),
            xMax: Math.round(MathHelper_1.default.clamp(point.x + threshold, this.width)),
        };
    }
    scan(fn) {
        this.image.scan(0, 0, this.width, this.height, fn);
    }
    getColorOnPosition(point, threshold = null) {
        if (threshold !== null && threshold > 1) {
            return this.getColorWithThreshold({ x: point.x, y: point.y }, threshold);
        }
        return this.jimpImage.getPixelColor(point.x, point.y, function (err, color) {
            return color;
        });
    }
    flattenImage(precision = 1) {
        let whiteVal = MathHelper_1.default.clamp(precision, 1) * ColorHelper_1.default.white;
        this.scan((x, y) => {
            let colorVal = ColorHelper_1.default.hexAlphaToDecNoAlpha(ColorHelper_1.default.decToHex(this.getColorOnPosition(x, y)));
            if (colorVal < whiteVal) {
                this.drawPoint({ x, y }, ColorHelper_1.default.black);
            }
            else {
                this.drawPoint({ x, y }, ColorHelper_1.default.white);
            }
        });
    }
    fillColor(color) {
        this.scan((x, y) => {
            this.drawPoint({ x, y }, color);
        });
    }
    drawPoint(point, color, thickness = 1, lerpColor = false) {
        if (thickness > 1) {
            let { xMin, xMax, yMin, yMax } = this.getPointsWithThreshold(point, thickness / 2), diffX = Math.abs(xMax - xMin), diffY = Math.abs(yMax - yMin);
            this.image.scan(xMin, yMin, diffX, diffY, (xx, yy) => {
                if (lerpColor) {
                    let t = 1 -
                        (Math.abs(point.x - xx) / diffX) *
                            (1 - Math.abs(point.y - yy) / diffY);
                    let alpha = MathHelper_1.default.lerp(0, 255, t);
                    color = ColorHelper_1.default.getColorWithAlpha(color, alpha);
                }
                this.image.setPixelColor(color, xx, yy);
            });
        }
        else {
            this.image.setPixelColor(color, point.x, point.y);
        }
    }
    drawBezier(bezierCurve, originalImage, scale = 1, color = null, lerpColor = false) {
        let getColor = false;
        if (color === null) {
            getColor = true;
        }
        let step = 1 / bezierCurve.divider;
        for (let t = 0; t < 1; t += step) {
            let point = bezierCurve.getPoint(t);
            if (!isNaN(point.x) && !isNaN(point.y)) {
                if (getColor) {
                    const originalColor = originalImage.getColorOnPosition(point, Math.floor(bezierCurve.thickness / 2));
                    this.drawPoint(new Point_1.default(point.x * scale, point.y * scale), originalColor, bezierCurve.thickness, lerpColor);
                }
                else if (color !== null) {
                    this.drawPoint(new Point_1.default(point.x * scale, point.y * scale), color, bezierCurve.thickness, lerpColor);
                }
            }
        }
    }
    writeImage(fileName = "image.png") {
        return this.jimpImage.write(fileName, (err, jimp) => {
            if (err !== null) {
                return err;
            }
            return jimp;
        });
    }
    toBase64() {
        let base64 = "";
        let error = null;
        this.image.getBase64(this.image.getMIME(), (err, res) => {
            if (err !== null) {
                error = err;
            }
            base64 = res;
        });
        if (error !== null) {
            return error;
        }
        return base64;
    }
    static createFromMatrix(edgeMatrix, config) {
        const color = config.bgColor ? ColorHelper_1.default.getColorFromHex(config.bgColor) : ColorHelper_1.default.black;
        return new JimpImage(new jimp_1.default(edgeMatrix.width * config.scale, edgeMatrix.height * config.scale, color, (err, image) => image), config.scale);
    }
    static createFromParams(width, height, scale = 1) {
        return new JimpImage(new jimp_1.default(width * scale, height * scale, ColorHelper_1.default.transparent, (err, image) => image), scale);
    }
}
exports.default = JimpImage;
//# sourceMappingURL=JimpImage.js.map