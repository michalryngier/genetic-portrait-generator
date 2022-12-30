import FitnessFunctionInterface from "./interfaces/FitnessFunctionInterface";
import AgentInterface from "./interfaces/AgentInterface";
import JimpImageInterface from "../graphics/interfaces/JimpImageInterface";
declare class FitnessFunction implements FitnessFunctionInterface {
    weight: number;
    decorator: FitnessFunctionInterface | null | undefined;
    constructor(weight: number | undefined, decorator: FitnessFunctionInterface | null | undefined);
    _evaluate(agent: AgentInterface, referenceImage: JimpImageInterface): number;
    evaluate(agent: AgentInterface, referenceImage: JimpImageInterface): number;
}
export default FitnessFunction;
//# sourceMappingURL=FitnessFunction.d.ts.map