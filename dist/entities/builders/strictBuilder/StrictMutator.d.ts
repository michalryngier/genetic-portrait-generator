import MutatorInterface from "../../genetics/interfaces/MutatorInterface";
import AgentInterface from "../../genetics/interfaces/AgentInterface";
declare class StrictMutator implements MutatorInterface {
    mutate(agent: AgentInterface, chance: number): AgentInterface;
}
export default StrictMutator;
//# sourceMappingURL=StrictMutator.d.ts.map