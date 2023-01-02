import _ from "lodash";
import Point from "./Point";
import MathHelper from "../../helpers/MathHelper";
import StringHelper from "../../helpers/StringHelper";
import PointInterface from "./interfaces/PointInterface";
import BezierCurveInterface from "./interfaces/BezierCurveInterface";
import ConfigurationProvider from "../../providers/ConfigurationProvider";

class BezierCurve implements BezierCurveInterface {
    public start: PointInterface = new Point(0, 0);
    public end: PointInterface = new Point(0, 0);
    public points: Array<PointInterface> = [];
    public thickness: number = 1;
    public divider: number = 100;

    constructor(
        start: PointInterface = {x: 0, y: 0},
        end: PointInterface = {x: 0, y: 0},
        points: Array<PointInterface> = [],
        thickness: number = 1,
        divider: number = 100
    ) {
        this.start = start;
        this.end = end;
        this.points = points;
        this.thickness = thickness;
        this.divider = divider;
    }

    static getRandomCurve(
        maxPoint: PointInterface,
        nofPoints: number = 1,
        thickness: number = 1,
        divider: number = 100
    ): BezierCurveInterface {
        let start = new Point(
                MathHelper.rand(maxPoint.x),
                MathHelper.rand(maxPoint.y)
            ),
            end = new Point(MathHelper.rand(maxPoint.x), MathHelper.rand(maxPoint.y)),
            points: Array<PointInterface> = [];

        for (let i = 0; i < nofPoints; i++) {
            points.push(
                new Point(MathHelper.rand(maxPoint.x), MathHelper.rand(maxPoint.y))
            );
        }

        return new BezierCurve(start, end, points, thickness, divider);
    }

    getPoint(t: number): PointInterface {
        let points: any = [];
        this.points.forEach((p: PointInterface) =>
            points.push(new Point(p.x, p.y))
        );

        return this.interpolate(t, [
            new Point(this.start.x, this.start.y),
            ...points,
            new Point(this.end.x, this.end.y),
        ]);
    }

    setProperties(
        start: PointInterface,
        end: PointInterface,
        points: Array<PointInterface>,
        thickness: number | null | undefined = null
    ): void {
        this.start = start;
        this.end = end;
        this.thickness = thickness ?? this.thickness;
        this.points = points;
    }

    interpolate(t: number, points: Array<PointInterface>): PointInterface {
        if (t === 0) {
            return points[0];
        }

        const order: number = points.length - 1;

        if (t === 1) {
            return points[order];
        }

        const mt: number = 1 - t;
        let p: Array<PointInterface> = points;

        // linear curve
        if (order === 1) {
            return new Point(
                mt * p[0].x + t * p[1].x,
                mt * p[0].y + t * p[1].y
            );
        }

        // quadratic or cubic curve
        if (order >= 2 && order < 4) {
            let mt2: number = mt * mt,
                t2: number = t * t,
                a: number,
                b: number,
                c: number,
                d: number = 0;

            if (order === 2) {
                p = [p[0], p[1], p[2], new Point(0, 0)];
                a = mt2;
                b = mt * t * 2;
                c = t2;
            } else {
                a = mt2 * mt;
                b = mt2 * t * 3;
                c = mt * t2 * 3;
                d = t * t2;
            }

            return new Point(
                a * p[0].x + b * p[1].x + c * p[2].x + d * p[3].x,
                a * p[0].y + b * p[1].y + c * p[2].y + d * p[3].y
            );
        }

        // Higher order curves - use de Casteljau's computation.
        const dCpts: Array<PointInterface> = points.map(p => new Point(p.x, p.y));
        while (dCpts.length > 1) {
            for (let i = 0; i < dCpts.length - 1; i++) {
                dCpts[i] = new Point(
                    dCpts[i].x + (dCpts[i + 1].x - dCpts[i].x) * t,
                    dCpts[i].y + (dCpts[i + 1].y - dCpts[i].y) * t,
                );
            }
            dCpts.splice(dCpts.length - 1, 1);
        }

        return dCpts[0];
    }

    asBinary(): string {
        const ALLELE_LENGTH = ConfigurationProvider.ALLELE_LENGTH;

        let startX = MathHelper.decToBinary(this.start.x, ALLELE_LENGTH);
        let startY = MathHelper.decToBinary(this.start.y, ALLELE_LENGTH);
        let endX = MathHelper.decToBinary(this.end.x, ALLELE_LENGTH);
        let endY = MathHelper.decToBinary(this.end.y, ALLELE_LENGTH);

        let points: Array<string> = [];
        this.points.forEach((point: PointInterface) => {
            points.push(MathHelper.decToBinary(point.x, ALLELE_LENGTH));
            points.push(MathHelper.decToBinary(point.y, ALLELE_LENGTH));
        });

        return startX + startY + endX + endY + points.join("");
    }

    updateFromBinary(binaryRepresentation: string | undefined): void {
        const ALLELE_LENGTH = ConfigurationProvider.ALLELE_LENGTH;

        if (!binaryRepresentation) {
            return;
        }
        let chunks: Array<string> | Array<number> = StringHelper.chunkString(
            binaryRepresentation,
            ALLELE_LENGTH
        );
        chunks = chunks.map((el) => MathHelper.binaryToDec(el));

        const start = new Point(chunks.shift(), chunks.shift());
        const end = new Point(chunks.shift(), chunks.shift());
        const points = _.chunk(chunks, 2).map((chunk) => {
            return new Point(chunk[0], chunk[1]);
        });

        this.setProperties(start, end, points, null);
    }
}

export default BezierCurve;
