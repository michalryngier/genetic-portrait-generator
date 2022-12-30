import PopulationType from "../../genetics/types/PopulationType";
import AgentInterface from "../../genetics/interfaces/AgentInterface";
import PopulatorInterface from "../../genetics/interfaces/PopulatorInterface";
declare class NoisePopulator implements PopulatorInterface {
    createPopulation(populationConfig: PopulationType): Array<AgentInterface>;
    private createAgentsFromCurves;
}
export default NoisePopulator;
//# sourceMappingURL=NoisePopulator.d.ts.map