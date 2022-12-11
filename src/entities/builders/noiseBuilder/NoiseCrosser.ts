import CrosserInterface from "../../genetics/interfaces/CrosserInterface";
import AgentInterface from "../../genetics/interfaces/AgentInterface";

class NoiseCrosser implements CrosserInterface {
    crossover(
        agent1: AgentInterface,
        agent2: AgentInterface,
        crossOverChance: number
    ): [AgentInterface, AgentInterface] {
        return [agent1, agent2];
    }
}

export default NoiseCrosser;
