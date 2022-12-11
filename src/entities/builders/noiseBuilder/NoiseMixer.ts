import MixerInterface from "../../genetics/interfaces/MixerInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";
import EvaluatorInterface from "../../genetics/interfaces/EvaluatorInterface";
import CrosserInterface from "../../genetics/interfaces/CrosserInterface";
import AgentInterface from "../../genetics/interfaces/AgentInterface";
import MutatorInterface from "../../genetics/interfaces/MutatorInterface";
import LoggerService from "../../../services/logger/LoggerService";

class NoiseMixer implements MixerInterface {
    mix(
        agents: Array<AgentInterface>,
        mutator: MutatorInterface,
        crosser: CrosserInterface,
        evaluator: EvaluatorInterface,
        referenceImage: JimpImageInterface,
        mutationChance: number,
        crossOverChance: number,
        nofMixes: number
    ): void {
        for (let i = 0; i < nofMixes; i++) {
            if (i !== 0) {
                agents.forEach((agent) => evaluator.evaluate(agent, referenceImage));
            }
            LoggerService.loading((((i + 1) / nofMixes) * 100).toString());
        }
    }
}

export default NoiseMixer;
