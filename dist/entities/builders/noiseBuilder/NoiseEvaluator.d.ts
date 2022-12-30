import AgentInterface from "../../genetics/interfaces/AgentInterface";
import EvaluatorInterface from "../../genetics/interfaces/EvaluatorInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";
import EvaluatorFunctionType from "../../genetics/types/EvaluatorFunctionType";
import FitnessFunctionInterface from "../../genetics/interfaces/FitnessFunctionInterface";
declare class NoiseEvaluator implements EvaluatorInterface {
    fitnessFunctions: Array<EvaluatorFunctionType>;
    evaluator: FitnessFunctionInterface | null;
    constructor(fitnessFunctions: Array<EvaluatorFunctionType>);
    evaluate(agent: AgentInterface, referenceImage: JimpImageInterface): void;
    private createEvaluator;
}
export default NoiseEvaluator;
//# sourceMappingURL=NoiseEvaluator.d.ts.map