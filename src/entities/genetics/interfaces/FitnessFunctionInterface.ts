import AgentInterface from "./AgentInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";

interface FitnessFunctionInterface {
    weight: number;
    next: FitnessFunctionInterface | undefined | null;

    _evaluate(agent: AgentInterface, referenceImage: JimpImageInterface): number;

    evaluate(agent: AgentInterface, referenceImage: JimpImageInterface): number;
}

export default FitnessFunctionInterface;