import FitnessFunction from "../../genetics/FitnessFunction";
import AgentInterface from "../../genetics/interfaces/AgentInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";
declare class StrictFitnessFunction extends FitnessFunction {
    evaluate(agent: AgentInterface, referenceImage: JimpImageInterface): number;
}
export default StrictFitnessFunction;
//# sourceMappingURL=StrictFitnessFunction.d.ts.map