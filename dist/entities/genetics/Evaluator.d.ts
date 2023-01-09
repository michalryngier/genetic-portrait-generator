import AgentInterface from "./interfaces/AgentInterface";
import EvaluatorInterface from "./interfaces/EvaluatorInterface";
import JimpImageInterface from "../graphics/interfaces/JimpImageInterface";
import EvaluatorFunctionType from "./types/EvaluatorFunctionType";
import FitnessFunctionInterface from "./interfaces/FitnessFunctionInterface";
declare class Evaluator implements EvaluatorInterface {
    fitnessFunctions: Array<EvaluatorFunctionType>;
    evaluator: FitnessFunctionInterface | null;
    constructor(fitnessFunctions: Array<EvaluatorFunctionType>);
    evaluate(agent: AgentInterface, referenceImage: JimpImageInterface): void;
    createEvaluationChain(): FitnessFunctionInterface | null;
}
export default Evaluator;
//# sourceMappingURL=Evaluator.d.ts.map