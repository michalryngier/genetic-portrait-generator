import FitnessFunctionInterface from "./interfaces/FitnessFunctionInterface";
import AgentInterface from "./interfaces/AgentInterface";
import JimpImageInterface from "../graphics/interfaces/JimpImageInterface";

class BaseFitnessFunction implements FitnessFunctionInterface {

    weight: number;
    next: FitnessFunctionInterface | null | undefined;

    constructor(weight = 1, next: FitnessFunctionInterface | null | undefined) {
        this.weight = weight;
        this.next = next;
    }

    _evaluate(agent: AgentInterface, edgeMatrix: JimpImageInterface): number {
        if (this.next) {
            return this.next.evaluate(agent, edgeMatrix);
        }

        return 0;
    }

    evaluate(agent: AgentInterface, edgeMatrix: JimpImageInterface): number {
        return 0 * this.weight + this._evaluate(agent, edgeMatrix);
    }
}