import CrosserInterface from "../../genetics/interfaces/CrosserInterface";
import AgentInterface from "../../genetics/interfaces/AgentInterface";
declare class NoiseCrosser implements CrosserInterface {
    crossover(agent1: AgentInterface, agent2: AgentInterface, crossoverChance: number): [AgentInterface, AgentInterface];
}
export default NoiseCrosser;
//# sourceMappingURL=NoiseCrosser.d.ts.map