import AgentInterface from "./AgentInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";
import EvaluatorFunctionType from "../types/EvaluatorFunctionType";

interface EvaluatorInterface {
    fitnessFunctions: Array<EvaluatorFunctionType>;

    evaluate(agent: AgentInterface, referenceImage: JimpImageInterface): void;
}

export default EvaluatorInterface;
