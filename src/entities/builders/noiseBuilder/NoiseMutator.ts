import MutatorInterface from "../../genetics/interfaces/MutatorInterface";
import AgentInterface from "../../genetics/interfaces/AgentInterface";

class NoiseMutator implements MutatorInterface {
    mutate(agent: AgentInterface, chance: number): AgentInterface {
        return agent;
    }
}

export default NoiseMutator;
