import Jimp from "jimp";
import MathHelper from "../../helpers/MathHelper";
import ColorHelper from "../../helpers/ColorHelper";
import JimpCallbackInterface from "./interfaces/JimpCallbackInterface";
import PointInterface from "./interfaces/PointInterface";
import ThreshholdInterface from "./interfaces/ThreshholdInterface";
import BezierCurveInterface from "./interfaces/BezierCurveInterface";
import JimpImageInterface from "./interfaces/JimpImageInterface";
import Point from "./Point";

class JimpImage implements JimpImageInterface {
    private jimpImage: Jimp;
    public width: number;
    public height: number;
    public scale: number;

    constructor(jimp: Jimp, scale: number = 1) {
        this.jimpImage = jimp;
        this.width = jimp.getWidth();
        this.height = jimp.getHeight();
        this.scale = scale;
    }

    get image(): Jimp {
        return this.jimpImage;
    }

    private getColorWithThreshold(
        point: PointInterface,
        threshold: number
    ): number {
        let {xMin, xMax, yMin, yMax} = this.getPointsWithThreshold(
            point,
            threshold
        );
        let sum = 0,
            iterations = 0;

        for (let xx = xMin; xx <= xMax; xx++) {
            for (let yy = yMin; yy <= yMax; yy++, iterations++) {
                sum += this.getColorOnPosition(new Point(xx, yy));
            }
        }

        return parseInt((sum / iterations).toString());
    }

    private getPointsWithThreshold(
        point: Point,
        threshold: number
    ): ThreshholdInterface {
        return {
            xMin: Math.round(MathHelper.clamp(point.x - threshold, this.width)),
            yMin: Math.round(MathHelper.clamp(point.y - threshold, this.height)),
            yMax: Math.round(MathHelper.clamp(point.y + threshold, this.height)),
            xMax: Math.round(MathHelper.clamp(point.x + threshold, this.width)),
        };
    }

    private scan(fn: JimpCallbackInterface) {
        this.image.scan(0, 0, this.width, this.height, fn);
    }

    getColorOnPosition(
        point: PointInterface,
        threshold: number | null = null
    ): number {
        if (threshold !== null && threshold > 1) {
            return this.getColorWithThreshold({x: point.x, y: point.y}, threshold);
        }

        return this.jimpImage.getPixelColor(
            point.x,
            point.y,
            function (err: Error | null, color: number) {
                return color;
            }
        );
    }

    flattenImage(precision = 1) {
        let whiteVal = MathHelper.clamp(precision, 1) * ColorHelper.white;

        this.scan((x, y) => {
            let colorVal = ColorHelper.hexAlphaToDecNoAlpha(
                ColorHelper.decToHex(this.getColorOnPosition(x, y))
            );
            if (colorVal < whiteVal) {
                this.drawPoint({x, y}, ColorHelper.black);
            } else {
                this.drawPoint({x, y}, ColorHelper.white);
            }
        });
    }

    fillColor(color: number) {
        this.scan((x, y) => {
            this.drawPoint({x, y}, color);
        });
    }

    drawPoint(
        point: PointInterface,
        color: number,
        thickness: number = 1,
        lerpColor: boolean = false
    ) {
        if (thickness > 1) {
            let {xMin, xMax, yMin, yMax} = this.getPointsWithThreshold(
                    point,
                    thickness / 2
                ),
                diffX = Math.abs(xMax - xMin),
                diffY = Math.abs(yMax - yMin);

            this.image.scan(xMin, yMin, diffX, diffY, (xx, yy) => {
                if (lerpColor) {
                    let t =
                        1 -
                        (Math.abs(point.x - xx) / diffX) *
                        (1 - Math.abs(point.y - yy) / diffY);
                    let alpha = MathHelper.lerp(0, 255, t);
                    color = ColorHelper.getColorWithAlpha(color, alpha);
                }
                this.image.setPixelColor(color, xx, yy);
            });
        } else {
            this.image.setPixelColor(color, point.x, point.y);
        }
    }

    drawBezier(
        bezierCurve: BezierCurveInterface,
        originalImage: JimpImageInterface,
        scale = 1,
        color: number | null = null,
        lerpColor = false,
    ): void {
        let getColor = false;
        if (color === null) {
            getColor = true;
        }
        let step = 1 / bezierCurve.bezierPoints;
        for (let t = 0; t < 1; t += step) {
            let point = bezierCurve.getPoint(t);
            if (!isNaN(point.x) && !isNaN(point.y)) {
                if (getColor) {
                    const originalColor = originalImage.getColorOnPosition(point, bezierCurve.thickness);
                    this.drawPoint(
                        new Point(point.x * scale, point.y * scale),
                        originalColor,
                        bezierCurve.thickness,
                        lerpColor
                    );
                } else if (color !== null) {
                    this.drawPoint(
                        new Point(point.x * scale, point.y * scale),
                        color,
                        bezierCurve.thickness,
                        lerpColor
                    );
                }
            }
        }
    }

    writeImage(fileName: string = "image.png"): Jimp | Error {
        return this.jimpImage.write(fileName, (err: Error | null, jimp: Jimp) => {
            if (err !== null) {
                return err;
            }

            return jimp;
        });
    }

    toBase64(): string | Error {
        let base64 = "";
        let error = null;
        this.image.getBase64(
            this.image.getMIME(),
            (err: Error | null, res: string) => {
                if (err !== null) {
                    error = err;
                }

                base64 = res;
            }
        );

        if (error !== null) {
            return error;
        }

        return base64;
    }

    static createFromMatrix(
        edgeMatrix: JimpImageInterface,
        scale: number = 1
    ): JimpImageInterface {
        return new JimpImage(
            new Jimp(
                edgeMatrix.width * scale,
                edgeMatrix.height * scale,
                ColorHelper.black,
                (err: Error, image: Jimp) => image
            ),
            scale
        );
    }

    static createFromParams(
        width: number,
        height: number,
        scale: number = 1
    ): JimpImageInterface {
        return new JimpImage(
            new Jimp(
                width * scale,
                height * scale,
                ColorHelper.transparent,
                (err: Error, image: Jimp) => image
            ),
            scale
        );
    }
}

export default JimpImage;
