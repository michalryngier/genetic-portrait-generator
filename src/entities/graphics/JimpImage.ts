import Jimp from "jimp";
import MathHelper from "../../helpers/MathHelper";
import ColorHelper from "../../helpers/ColorHelper";
import JimpCallbackInterface from "./interfaces/JimpCallbackInterface";
import PointInterface from "./interfaces/PointInterface";
import ThresholdType from "./types/ThresholdType";
import BezierCurveInterface from "./interfaces/BezierCurveInterface";
import JimpImageInterface from "./interfaces/JimpImageInterface";
import Point from "./Point";
import OutputImageConfigType from "./types/OutputImageConfigType";

class JimpImage implements JimpImageInterface {
    public readonly jimpImage: Jimp;
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

        return sum / iterations;
    }

    private getPointsWithThreshold(
        point: Point,
        threshold: number
    ): ThresholdType {
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

    private flattenImage(precision = 1) {
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

    private fillColor(color: number) {
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
        color: number | null = null,
        lerpColor = false,
    ): void {
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
                    this.drawPoint(
                        new Point(point.x * this.scale, point.y * this.scale),
                        originalColor,
                        bezierCurve.thickness,
                        lerpColor
                    );
                } else if (color !== null) {
                    this.drawPoint(
                        new Point(point.x * this.scale, point.y * this.scale),
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
        config: OutputImageConfigType
    ): JimpImageInterface {
        const color = config.bgColor ? ColorHelper.getColorFromHex(config.bgColor) : ColorHelper.black;

        return new JimpImage(
            new Jimp(
                edgeMatrix.width * config.scale,
                edgeMatrix.height * config.scale,
                color,
                (err: Error, image: Jimp) => image
            ),
            config.scale
        );
    }

    static createFromParams(
        width: number,
        height: number,
        scale: number = 1,
        color: number | null
    ): JimpImageInterface {
        return new JimpImage(
            new Jimp(
                width * scale,
                height * scale,
                color ?? ColorHelper.transparent,
                (err: Error, image: Jimp) => image
            ),
            scale
        );
    }
}

export default JimpImage;
