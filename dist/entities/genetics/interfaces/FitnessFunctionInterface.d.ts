import AgentInterface from "./AgentInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";
interface FitnessFunctionInterface {
    weight: number;
    decorator: FitnessFunctionInterface | undefined | null;
    applyDecorator(agent: AgentInterface, referenceImage: JimpImageInterface): number;
    evaluate(agent: AgentInterface, referenceImage: JimpImageInterface): number;
}
export default FitnessFunctionInterface;
//# sourceMappingURL=FitnessFunctionInterface.d.ts.map