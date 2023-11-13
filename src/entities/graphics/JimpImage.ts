import Jimp from "jimp";
import MathHelper from "../../helpers/MathHelper";
import ColorHelper from "../../helpers/ColorHelper";
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
        let {xMin, xMax, yMin, yMax} = this.getPointsWithThreshold(point, threshold);
        let sum = {r: 0, g: 0, b: 0},
            iterations = 0;

        for (let xx = xMin; xx <= xMax; xx++) {
            for (let yy = yMin; yy <= yMax; yy++, iterations++) {
                if (this.width < xx || this.height < yy || 0 > xx || 0 > yy) {
                    continue;
                }
                const color = this.jimpImage.getPixelColor(
                    xx,
                    yy,
                    (err: Error | null, color: number) => {
                        if (err === null) {
                            return color
                        }

                        return 0;
                    }
                );
                const colorRGB = Jimp.intToRGBA(color);
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

        return Jimp.rgbaToInt(sum.r, sum.g, sum.b, 255);
    }

    private getPointsWithThreshold(
        point: Point,
        threshold: number
    ): ThresholdType {
        threshold = Math.floor(threshold / 2);

        return {
            xMin: MathHelper.clamp(point.x - threshold, this.width),
            yMin: MathHelper.clamp(point.y - threshold, this.height),
            yMax: MathHelper.clamp(point.y + threshold, this.height),
            xMax: MathHelper.clamp(point.x + threshold, this.width),
        };
    }

    getColorOnPosition(
        point: PointInterface,
        threshold: number | null = null
    ): number {
        if (threshold !== null && threshold > 1) {
            return this.getColorWithThreshold(point, threshold);
        }

        return this.jimpImage.getPixelColor(
            point.x,
            point.y,
            (err: Error | null, color: number) => {
                if (err === null && color !== undefined) {
                    return color
                }

                return 0;
            }
        );
    }

    drawPoint(
        point: PointInterface,
        color: number,
        thickness: number = 1,
        lerpColor: boolean = false
    ) {
        if (thickness > 1) {
            let {xMin, xMax, yMin, yMax} = this.getPointsWithThreshold(point, thickness),
                diffX = Math.abs(xMax - xMin),
                diffY = Math.abs(yMax - yMin);

            this.image.scan(xMin, yMin, diffX, diffY, (xx, yy) => {
                if (lerpColor) {
                    let t =
                        (1 - (Math.abs(point.x - xx) / diffX)) *
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
                    const originalColor = originalImage.getColorOnPosition(point, bezierCurve.thickness);
                    this.drawPoint(
                        new Point(point.x * this.scale, point.y * this.scale),
                        originalColor,
                        bezierCurve.thickness * this.scale,
                        lerpColor
                    );
                } else if (color !== null) {
                    this.drawPoint(
                        new Point(point.x * this.scale, point.y * this.scale),
                        color,
                        bezierCurve.thickness * this.scale,
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
