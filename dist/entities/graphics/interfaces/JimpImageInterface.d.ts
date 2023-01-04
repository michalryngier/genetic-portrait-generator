import Jimp from "jimp";
import PointInterface from "./PointInterface";
import BezierCurveInterface from "./BezierCurveInterface";
interface JimpImageInterface {
    readonly jimpImage: Jimp;
    width: number;
    height: number;
    scale: number;
    get image(): Jimp;
    writeImage(fileName: string): Jimp | Error;
    toBase64(): string | Error;
    getColorOnPosition(point: PointInterface, threshold: number | null): number;
    drawBezier(bezierCurve: BezierCurveInterface, originalImage: JimpImageInterface, color: number | null, lerpColor: boolean): void;
}
export default JimpImageInterface;
//# sourceMappingURL=JimpImageInterface.d.ts.map