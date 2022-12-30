import AgentInterface from "./interfaces/AgentInterface";
import BezierCurveInterface from "../graphics/interfaces/BezierCurveInterface";
declare class Agent implements AgentInterface {
    bezierCurve: BezierCurveInterface;
    fitnessScore: number;
    geneticRepresentation: string;
    constructor(bezierCurve: BezierCurveInterface);
    buildGeneticRepresentation(): void;
    getUpdatedBezierCurve(): BezierCurveInterface;
    protected updateBezierCurve(): void;
}
export default Agent;
//# sourceMappingURL=Agent.d.ts.map