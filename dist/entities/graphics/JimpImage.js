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
        let sum = { r: 0, g: 0, b: 0 }, iterations = 0;
        for (let xx = xMin; xx <= xMax; xx++) {
            for (let yy = yMin; yy <= yMax; yy++, iterations++) {
                if (this.width < xx || this.height < yy || 0 > xx || 0 > yy) {
                    continue;
                }
                const color = this.jimpImage.getPixelColor(xx, yy, function (err, color) {
                    if (err === null) {
                        return color;
                    }
                    return 0;
                });
                const colorRGB = jimp_1.default.intToRGBA(color);
                sum.r += colorRGB.r;
                sum.g += colorRGB.g;
                sum.b += colorRGB.b;
            }
        }
        if (iterations === 0) {
            return 0;
        }
        sum.r = Math.floor(sum.r / iterations);
        sum.g = Math.floor(sum.g / iterations);
        sum.b = Math.floor(sum.b / iterations);
        return jimp_1.default.rgbaToInt(sum.r, sum.g, sum.b, 255);
    }
    getPointsWithThreshold(point, threshold) {
        threshold = Math.floor(threshold / 2);
        return {
            xMin: MathHelper_1.default.clamp(point.x - threshold, this.width),
            yMin: MathHelper_1.default.clamp(point.y - threshold, this.height),
            yMax: MathHelper_1.default.clamp(point.y + threshold, this.height),
            xMax: MathHelper_1.default.clamp(point.x + threshold, this.width),
        };
    }
    getColorOnPosition(point, threshold = null) {
        if (threshold !== null && threshold > 1) {
            return this.getColorWithThreshold(point, threshold);
        }
        return this.jimpImage.getPixelColor(point.x, point.y, function (err, color) {
            if (err === null && color !== undefined) {
                return color;
            }
            return 0;
        });
    }
    drawPoint(point, color, thickness = 1, lerpColor = false) {
        if (thickness > 1) {
            let { xMin, xMax, yMin, yMax } = this.getPointsWithThreshold(point, thickness), diffX = Math.abs(xMax - xMin), diffY = Math.abs(yMax - yMin);
            this.image.scan(xMin, yMin, diffX, diffY, (xx, yy) => {
                if (lerpColor) {
                    let t = (1 - (Math.abs(point.x - xx) / diffX)) *
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
    drawBezier(bezierCurve, originalImage, color = null, lerpColor = false) {
        let getColor = false;
        if (color === null) {
            getColor = true;
        }
        let step = 1 / bezierCurve.divider;
        for (let t = 0; t < 1; t += step) {
            let point = bezierCurve.getPoint(t);
            if (!isNaN(point.x) && !isNaN(point.y)) {
                if (getColor) {
                    const originalColor = originalImage.getColorOnPosition(point, bezierCurve.thickness);
                    this.drawPoint(new Point_1.default(point.x * this.scale, point.y * this.scale), originalColor, bezierCurve.thickness, lerpColor);
                }
                else if (color !== null) {
                    this.drawPoint(new Point_1.default(point.x * this.scale, point.y * this.scale), color, bezierCurve.thickness, lerpColor);
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
    static createFromParams(width, height, scale = 1, color) {
        return new JimpImage(new jimp_1.default(width * scale, height * scale, color !== null && color !== void 0 ? color : ColorHelper_1.default.transparent, (err, image) => image), scale);
    }
}
exports.default = JimpImage;
//# sourceMappingURL=JimpImage.js.map