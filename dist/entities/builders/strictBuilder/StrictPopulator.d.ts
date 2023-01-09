import PopulationType from "../../genetics/types/PopulationType";
import AgentInterface from "../../genetics/interfaces/AgentInterface";
import PopulatorInterface from "../../genetics/interfaces/PopulatorInterface";
declare class StrictPopulator implements PopulatorInterface {
    createPopulation(populationConfig: PopulationType): Array<AgentInterface>;
    private createAgentsFromCurves;
}
export default StrictPopulator;
//# sourceMappingURL=StrictPopulator.d.ts.map