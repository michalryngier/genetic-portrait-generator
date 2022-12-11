import FitnessFunction from "../../genetics/FitnessFunction";
import AgentInterface from "../../genetics/interfaces/AgentInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";

class OutlineFitnessFunction extends FitnessFunction {
    evaluate(agent: AgentInterface, referenceImage: JimpImageInterface): number {
        let value = 1;

        return value * this.weight + this._evaluate(agent, referenceImage);
    }
}

export default OutlineFitnessFunction;