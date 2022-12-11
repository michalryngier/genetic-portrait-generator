import AgentInterface from "./AgentInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";

interface FitnessFunctionInterface {
    weight: number;
    decorator: FitnessFunctionInterface | undefined | null;

    _evaluate(agent: AgentInterface, referenceImage: JimpImageInterface): number;

    evaluate(agent: AgentInterface, referenceImage: JimpImageInterface): number;
}

export default FitnessFunctionInterface;
