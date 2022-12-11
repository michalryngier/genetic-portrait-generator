import PointInterface from "./PointInterface";

interface BezierCurveInterface {
    start: PointInterface;
    end: PointInterface;
    points: Array<PointInterface>;
    thickness: number;
    bezierPoints: number;

    getPoint(t: number): PointInterface;
}

export default BezierCurveInterface;