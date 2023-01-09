import FitnessFunction from "../../genetics/FitnessFunction";
import AgentInterface from "../../genetics/interfaces/AgentInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";
declare class NoiseFitnessFunction extends FitnessFunction {
    performEvaluation(agent: AgentInterface, referenceImage: JimpImageInterface): number;
}
export default NoiseFitnessFunction;
//# sourceMappingURL=NoiseFitnessFunction.d.ts.map