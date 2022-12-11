import AgentInterface from "./AgentInterface";
import PopulationType from "../types/PopulationType";

interface PopulatorServiceInterface {
    createPopulation(populationConfig: PopulationType | undefined): Array<AgentInterface>
}

export default PopulatorServiceInterface;