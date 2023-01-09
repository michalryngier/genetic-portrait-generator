import AgentInterface from "./AgentInterface";

interface CrosserInterface {
    crossover(
        agent1: AgentInterface,
        agent2: AgentInterface,
        crossoverChance: number
    ): [AgentInterface, AgentInterface];
}

export default CrosserInterface;
