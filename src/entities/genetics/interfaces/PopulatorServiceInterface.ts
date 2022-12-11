import AgentInterface from "./AgentInterface";
import PopulationInterface from "./PopulationInterface";

interface PopulatorServiceInterface {
    createPopulation(populationConfig: PopulationInterface | undefined): Array<AgentInterface>
}

export default PopulatorServiceInterface;