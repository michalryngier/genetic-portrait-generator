import AgentInterface from "./AgentInterface";
import PopulationConfigType from "../types/PopulationConfigType";

interface PopulatorInterface {
    createPopulation(populationConfig: PopulationConfigType): Array<AgentInterface>;
}

export default PopulatorInterface;
