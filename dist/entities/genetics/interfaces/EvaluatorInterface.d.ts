import AgentInterface from "./AgentInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";
import EvaluatorFunctionType from "../types/EvaluatorFunctionType";
import FitnessFunctionInterface from "./FitnessFunctionInterface";
interface EvaluatorInterface {
    fitnessFunctions: Array<EvaluatorFunctionType>;
    evaluate(agent: AgentInterface, referenceImage: JimpImageInterface): void;
    createEvaluationChain(): FitnessFunctionInterface | null;
}
export default EvaluatorInterface;
//# sourceMappingURL=EvaluatorInterface.d.ts.map