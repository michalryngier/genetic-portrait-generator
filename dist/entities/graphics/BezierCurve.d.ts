import PointInterface from "./interfaces/PointInterface";
import BezierCurveInterface from "./interfaces/BezierCurveInterface";
declare class BezierCurve implements BezierCurveInterface {
    start: PointInterface;
    end: PointInterface;
    points: Array<PointInterface>;
    thickness: number;
    bezierPoints: number;
    constructor(start?: PointInterface, end?: PointInterface, points?: Array<PointInterface>, thickness?: number, bezierPoints?: number);
    static getRandomCurve(maxPoint: PointInterface, nofPoints?: number, thickness?: number, bezierPoints?: number): BezierCurveInterface;
    getPoint(t: number): PointInterface;
    setProperties(start: PointInterface, end: PointInterface, points: Array<PointInterface>, thickness?: number | null | undefined): void;
    interpolate(t: number, points: Array<PointInterface>): PointInterface;
    asBinary(): string;
    updateFromBinary(binaryRepresentation: string | undefined): void;
}
export default BezierCurve;
//# sourceMappingURL=BezierCurve.d.ts.map