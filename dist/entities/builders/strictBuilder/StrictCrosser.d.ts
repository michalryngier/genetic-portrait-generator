import CrosserInterface from "../../genetics/interfaces/CrosserInterface";
import AgentInterface from "../../genetics/interfaces/AgentInterface";
declare class StrictCrosser implements CrosserInterface {
    crossover(agent1: AgentInterface, agent2: AgentInterface, crossOverChance: number): [AgentInterface, AgentInterface];
}
export default StrictCrosser;
//# sourceMappingURL=StrictCrosser.d.ts.map