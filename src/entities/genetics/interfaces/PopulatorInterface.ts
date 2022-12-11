import AgentInterface from "./AgentInterface";
import PopulationType from "../types/PopulationType";

interface PopulatorInterface {
    createPopulation(
        populationConfig: PopulationType | undefined
    ): Array<AgentInterface>;
}

export default PopulatorInterface;
