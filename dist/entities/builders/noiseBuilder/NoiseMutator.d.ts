import MutatorInterface from "../../genetics/interfaces/MutatorInterface";
import AgentInterface from "../../genetics/interfaces/AgentInterface";
declare class NoiseMutator implements MutatorInterface {
    mutate(agent: AgentInterface, mutationChance: number): AgentInterface;
}
export default NoiseMutator;
//# sourceMappingURL=NoiseMutator.d.ts.map