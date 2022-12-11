import Point from "./Point";
import _ from "lodash";
import MathHelper from "../../helpers/MathHelper";
import PointInterface from "./interfaces/PointInterface";
import BezierCurveInterface from "./interfaces/BezierCurveInterface";
import ColorHelper from "../../helpers/ColorHelper";
import StringHelper from "../../helpers/StringHelper";
import ConfigurationProvider from "../../providers/ConfigurationProvider";

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

        return new BezierCurve(start, end, points, thickness, bezierPoints);
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
        let order = points.length - 1;
        let v: Array<PointInterface> = _.cloneDeep(points);

        for (let i = order; i > 0; i--) {
            for (let j = 0; j < order; j++) {
                v[j].x = (1 - t) * v[j].x + t * v[j + 1].x;
                v[j].y = (1 - t) * v[j].y + t * v[j + 1].y;
            }
        }

        return v[0];
    }

    asBinary(): string {
        const ALLELE_LENGTH = ConfigurationProvider.ALLELE_LENGTH;

        let startX = ColorHelper.decToBinary(this.start.x, ALLELE_LENGTH);
        let startY = ColorHelper.decToBinary(this.start.y, ALLELE_LENGTH);
        let endX = ColorHelper.decToBinary(this.end.x, ALLELE_LENGTH);
        let endY = ColorHelper.decToBinary(this.end.y, ALLELE_LENGTH);

        let points: Array<string> = [];
        this.points.forEach((point: PointInterface) => {
            points.push(ColorHelper.decToBinary(point.x, ALLELE_LENGTH));
            points.push(ColorHelper.decToBinary(point.y, ALLELE_LENGTH));
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
        chunks = chunks.map((el) => ColorHelper.binaryToDec(el));

        const start = new Point(chunks.shift(), chunks.shift());
        const end = new Point(chunks.shift(), chunks.shift());
        const points = _.chunk(chunks, 2).map((chunk) => {
            return new Point(chunk[0], chunk[1]);
        });

        this.setProperties(start, end, points, null);
    }
}

export default BezierCurve;
