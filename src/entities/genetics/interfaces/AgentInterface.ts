import BezierCurveInterface from "../../graphics/interfaces/BezierCurveInterface";

interface AgentInterface {
    bezierCurve: BezierCurveInterface;
    fitnessScore: number;
    geneticRepresentation: string | undefined;

    getUpdatedBezierCurve(): BezierCurveInterface;
}

export default AgentInterface;