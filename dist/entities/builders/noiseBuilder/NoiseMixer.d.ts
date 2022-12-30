import MixerInterface from "../../genetics/interfaces/MixerInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";
import EvaluatorInterface from "../../genetics/interfaces/EvaluatorInterface";
import CrosserInterface from "../../genetics/interfaces/CrosserInterface";
import AgentInterface from "../../genetics/interfaces/AgentInterface";
import MutatorInterface from "../../genetics/interfaces/MutatorInterface";
declare class NoiseMixer implements MixerInterface {
    mix(agents: Array<AgentInterface>, mutator: MutatorInterface, crosser: CrosserInterface, evaluator: EvaluatorInterface, referenceImage: JimpImageInterface, mutationChance: number, crossOverChance: number, nofMixes: number): void;
    private sortAgents;
    private normalizeAgents;
    private crossover;
    mutation(agents: Array<AgentInterface>, mutator: MutatorInterface, mutationChance: number): void;
    private drawAgent;
}
export default NoiseMixer;
//# sourceMappingURL=NoiseMixer.d.ts.map