import MixerInterface from "../../genetics/interfaces/MixerInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";
import EvaluatorInterface from "../../genetics/interfaces/EvaluatorInterface";
import CrosserInterface from "../../genetics/interfaces/CrosserInterface";
import AgentInterface from "../../genetics/interfaces/AgentInterface";
import MutatorInterface from "../../genetics/interfaces/MutatorInterface";
declare class NoiseMixer implements MixerInterface {
    mix(agents: Array<AgentInterface>, mutator: MutatorInterface, crosser: CrosserInterface, evaluator: EvaluatorInterface, referenceImage: JimpImageInterface, mutationChance: number, crossoverChance: number, nofMixes: number): Array<AgentInterface>;
    private sortAgents;
    private normalizeAgents;
    private crossover;
    private mutation;
    private drawAgent;
}
export default NoiseMixer;
//# sourceMappingURL=NoiseMixer.d.ts.map