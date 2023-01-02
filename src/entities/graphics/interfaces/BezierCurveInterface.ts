import PointInterface from "./PointInterface";

interface BezierCurveInterface {
    start: PointInterface;
    end: PointInterface;
    points: Array<PointInterface>;
    thickness: number;
    divider: number;

    getPoint(t: number): PointInterface;

    setProperties(
        start: PointInterface,
        end: PointInterface,
        points: Array<PointInterface>,
        thickness: number | null
    ): void;

    interpolate(t: number, points: Array<PointInterface>): PointInterface;

    asBinary(): string;

    updateFromBinary(binaryRepresentation: string | undefined): void;
}

export default BezierCurveInterface;
