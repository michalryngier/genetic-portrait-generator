import Point from "../entities/Point";
import PointInterface from "../interfaces/PointInterface";
import BezierCurveInterface from "../interfaces/BezierCurveInterface";
import _ from "lodash";
import MathHelper from "../helpers/MathHelper";

class BezierCurve implements BezierCurveInterface {
    public start: PointInterface = new Point(0, 0);
    public end: PointInterface = new Point(0, 0);
    public points: Array<PointInterface> = [];
    public thickness: number = 1;
    public bezierPoints: number = 100;

    constructor(
        start: PointInterface = {x: 0, y: 0},
        end: PointInterface = {x: 0, y: 0},
        points: Array<PointInterface> = [],
        thickness: number = 1,
        bezierPoints: number = 100
    ) {
        this.start = start;
        this.end = end;
        this.points = points;
        this.thickness = thickness;
        this.bezierPoints = bezierPoints;
    }

    static getRandomCurve(
        maxPoint: PointInterface,
        nofPoints: number = 1,
        thickness: number = 1,
        bezierPoints: number = 100
    ): BezierCurveInterface {
        let start = new Point(MathHelper.rand(maxPoint.x), MathHelper.rand(maxPoint.y)),
            end = new Point(MathHelper.rand(maxPoint.x), MathHelper.rand(maxPoint.y)),
            points: Array<PointInterface> = [];

        for (let i = 0; i < nofPoints; i++) {
            points.push(new Point(MathHelper.rand(maxPoint.x), MathHelper.rand(maxPoint.y)));
        }

        return new BezierCurve(start, end, points, thickness, bezierPoints);
    }

    getPoint(t: number): PointInterface {
        let points: any = [];
        this.points.forEach((p: PointInterface) => points.push(new Point(p.x, p.y)));

        return this.interpolate(
            t,
            [
                new Point(this.start.x, this.start.y),
                ...points,
                new Point(this.end.x, this.end.y)
            ]
        );
    }

    setProperties(
        start: PointInterface,
        end: PointInterface,
        points: Array<PointInterface>,
        thickness: number | null = null
    ): void {
        this.start = start;
        this.end = end;
        this.thickness = thickness ?? this.thickness;
        this.points = points;
    }

    interpolate(t: number, points: Array<PointInterface>): PointInterface {
        let order = points.length - 1;
        let v: Array<PointInterface> = _.cloneDeep(points)

        for (let i = order; i > 0; i--) {
            for (let j = 0; j < order; j++) {
                v[j].x = (1 - t) * v[j].x + t * v[j + 1].x;
                v[j].y = (1 - t) * v[j].y + t * v[j + 1].y;
            }
        }

        return v[0];
    }
}