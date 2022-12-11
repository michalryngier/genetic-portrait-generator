import AgentInterface from "./interfaces/AgentInterface";
import BezierCurveInterface from "../graphics/interfaces/BezierCurveInterface";

class Agent implements AgentInterface {
    bezierCurve: BezierCurveInterface;
    fitnessScore: number = 0;
    geneticRepresentation: string | undefined;


    constructor(bezierCurve: BezierCurveInterface) {
        this.bezierCurve = bezierCurve;
        this.buildGeneticRepresentation();
    }

    buildGeneticRepresentation() {
        this.geneticRepresentation = this.bezierCurve.asBinary();
    }

    getUpdatedBezierCurve(): BezierCurveInterface{
        this.updateBezierCurve();

        return this.bezierCurve;
    }

    protected updateBezierCurve(): void {
        this.bezierCurve.updateFromBinary(this.geneticRepresentation);
    }
}

export default Agent;