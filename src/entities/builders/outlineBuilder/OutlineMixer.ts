import MixerInterface from "../../genetics/interfaces/MixerInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";
import EvaluatorInterface from "../../genetics/interfaces/EvaluatorInterface";
import CrosserInterface from "../../genetics/interfaces/CrosserInterface";
import AgentInterface from "../../genetics/interfaces/AgentInterface";
import MutatorInterface from "../../genetics/interfaces/MutatorInterface";

class OutlineMixer implements MixerInterface {
    mix(
        agents: Array<AgentInterface>,
        mutator: MutatorInterface | undefined,
        crosser: CrosserInterface | undefined,
        evaluator: EvaluatorInterface | undefined,
        referenceImage: JimpImageInterface | undefined,
        mutationChance: number | undefined,
        crossOverChance: number | undefined
    ): void {
    }
}

export default OutlineMixer;