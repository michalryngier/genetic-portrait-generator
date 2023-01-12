import AgentInterface from "./AgentInterface";
import MutatorInterface from "./MutatorInterface";
import CrosserInterface from "./CrosserInterface";
import EvaluatorInterface from "./EvaluatorInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";
interface MixerInterface {
    mix(agents: Array<AgentInterface>, mutator: MutatorInterface, crosser: CrosserInterface, evaluator: EvaluatorInterface, referenceImage: JimpImageInterface, mutationChance: number, crossOverChance: number, nofMixes: number): Array<AgentInterface>;
}
export default MixerInterface;
//# sourceMappingURL=MixerInterface.d.ts.map