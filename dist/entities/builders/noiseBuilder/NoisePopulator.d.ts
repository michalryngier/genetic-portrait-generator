import PopulationConfigType from "../../genetics/types/PopulationConfigType";
import AgentInterface from "../../genetics/interfaces/AgentInterface";
import PopulatorInterface from "../../genetics/interfaces/PopulatorInterface";
declare class NoisePopulator implements PopulatorInterface {
    createPopulation(populationConfig: PopulationConfigType): Array<AgentInterface>;
    private createAgentsFromCurves;
}
export default NoisePopulator;
//# sourceMappingURL=NoisePopulator.d.ts.map