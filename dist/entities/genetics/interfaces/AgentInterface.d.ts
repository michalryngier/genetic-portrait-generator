import BezierCurveInterface from "../../graphics/interfaces/BezierCurveInterface";
interface AgentInterface {
    bezierCurve: BezierCurveInterface;
    fitnessScore: number;
    geneticRepresentation: string;
    getUpdatedBezierCurve(): BezierCurveInterface;
}
export default AgentInterface;
//# sourceMappingURL=AgentInterface.d.ts.map