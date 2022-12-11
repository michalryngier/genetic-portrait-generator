import PopulationType from "../../genetics/types/PopulationType";
import AgentInterface from "../../genetics/interfaces/AgentInterface";
import PopulatorInterface from "../../genetics/interfaces/PopulatorInterface";

class OutlinePopulator implements PopulatorInterface {
    createPopulation(
        populationConfig: PopulationType | undefined
    ): Array<AgentInterface> {
        return [];
    }
}

export default OutlinePopulator;
