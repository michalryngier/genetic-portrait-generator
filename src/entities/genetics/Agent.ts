import AgentInterface from "./interfaces/AgentInterface";
import BezierCurveInterface from "../graphics/interfaces/BezierCurveInterface";
import ColorHelper from "../../helpers/ColorHelper";
import Point from "../graphics/Point";
import StringHelper from "../../helpers/StringHelper";
import _ from "lodash";

const ALLELE_LENGTH = 64;

class Agent implements AgentInterface {
    bezierCurve: BezierCurveInterface;
    fitnessScore: number = 0;
    geneticRepresentation: string | undefined;


    constructor(bezierCurve: BezierCurveInterface) {
        this.bezierCurve = bezierCurve;
        this.buildGeneticRepresentation();
    }

    buildGeneticRepresentation() {
        let startX = ColorHelper.decToBinary(this.bezierCurve.start.x, ALLELE_LENGTH);
        let startY = ColorHelper.decToBinary(this.bezierCurve.start.y, ALLELE_LENGTH);
        let endX = ColorHelper.decToBinary(this.bezierCurve.end.x, ALLELE_LENGTH);
        let endY = ColorHelper.decToBinary(this.bezierCurve.end.y, ALLELE_LENGTH);

        let points: Array<string> = [];
        this.bezierCurve.points.forEach((point) => {
            points.push(ColorHelper.decToBinary(point.x, ALLELE_LENGTH));
            points.push(ColorHelper.decToBinary(point.y, ALLELE_LENGTH));
        });

        this.geneticRepresentation = startX + startY + endX + endY + points.join("");
    }

    getUpdatedBezierCurve(): BezierCurveInterface{
        this.updateBezierCurve(this.geneticRepresentation);

        return this.bezierCurve;
    }

    private updateBezierCurve(geneticCode: string | undefined): void {
        if (!geneticCode) {
            return;
        }
        let chunks: Array<string> | Array<number> = StringHelper.chunkString(geneticCode, ALLELE_LENGTH);
        chunks = chunks.map((el) => ColorHelper.binaryToDec(el));

        const start = new Point(chunks.shift(), chunks.shift());
        const end = new Point(chunks.shift(), chunks.shift());
        const points = _.chunk(chunks, 2).map((chunk) => {
            return new Point(chunk[0], chunk[1]);
        });

        this.bezierCurve.setProperties(start, end, points, null);
    }
}

export default Agent;