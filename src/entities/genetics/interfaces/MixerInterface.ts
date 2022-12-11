import AgentInterface from "./AgentInterface";
import MutatorInterface from "./MutatorInterface";
import CrosserInterface from "./CrosserInterface";
import EvaluatorInterface from "./EvaluatorInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";

interface MixerInterface {
    mix(
        agents: Array<AgentInterface>,
        mutator: MutatorInterface | undefined,
        crosser: CrosserInterface | undefined,
        evaluator: EvaluatorInterface | undefined,
        referenceImage: JimpImageInterface | undefined,
        mutationChance: number | undefined,
        crossOverChance: number | undefined
    ): void;
}

export default MixerInterface;