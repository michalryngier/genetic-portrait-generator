import AgentInterface from "./AgentInterface";

interface MutatorInterface {
    mutate(agent: AgentInterface, mutationChance: number): AgentInterface;
}

export default MutatorInterface;
