import FitnessFunctionInterface from "./interfaces/FitnessFunctionInterface";
import AgentInterface from "./interfaces/AgentInterface";
import JimpImageInterface from "../graphics/interfaces/JimpImageInterface";
declare abstract class AbstractFitnessFunction implements FitnessFunctionInterface {
    weight: number;
    decorator: FitnessFunctionInterface | null | undefined;
    constructor(weight: number | undefined, decorator: FitnessFunctionInterface | null | undefined);
    applyDecorator(agent: AgentInterface, referenceImage: JimpImageInterface): number;
    evaluate(agent: AgentInterface, referenceImage: JimpImageInterface): number;
    protected abstract performEvaluation(agent: AgentInterface, referenceImage: JimpImageInterface): number;
}
export default AbstractFitnessFunction;
//# sourceMappingURL=AbstractFitnessFunction.d.ts.map