import FitnessFunctionInterface from "./FitnessFunctionInterface";
import AgentInterface from "./AgentInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";

interface EvaluatorInterface {
    fitnessFunctions: Array<FitnessFunctionInterface>;
    evaluate(agent: AgentInterface, referenceImage: JimpImageInterface): void;
}

export default EvaluatorInterface;