import Jimp from "jimp";
import PointInterface from "./interfaces/PointInterface";
import BezierCurveInterface from "./interfaces/BezierCurveInterface";
import JimpImageInterface from "./interfaces/JimpImageInterface";
import OutputImageConfigType from "./types/OutputImageConfigType";
declare class JimpImage implements JimpImageInterface {
    readonly jimpImage: Jimp;
    width: number;
    height: number;
    scale: number;
    constructor(jimp: Jimp, scale?: number);
    get image(): Jimp;
    private getColorWithThreshold;
    private getPointsWithThreshold;
    getColorOnPosition(point: PointInterface, threshold?: number | null): number;
    drawPoint(point: PointInterface, color: number, thickness?: number, lerpColor?: boolean): void;
    drawBezier(bezierCurve: BezierCurveInterface, originalImage: JimpImageInterface, color?: number | null, lerpColor?: boolean): void;
    writeImage(fileName?: string): Jimp | Error;
    toBase64(): string | Error;
    static createFromMatrix(edgeMatrix: JimpImageInterface, config: OutputImageConfigType): JimpImageInterface;
    static createFromParams(width: number, height: number, scale: number | undefined, color: number | null): JimpImageInterface;
}
export default JimpImage;
//# sourceMappingURL=JimpImage.d.ts.map