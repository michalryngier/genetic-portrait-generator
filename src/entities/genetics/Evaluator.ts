import AgentInterface from "./interfaces/AgentInterface";
import EvaluatorInterface from "./interfaces/EvaluatorInterface";
import JimpImageInterface from "../graphics/interfaces/JimpImageInterface";
import EvaluatorFunctionType from "./types/EvaluatorFunctionType";
import FitnessFunctionInterface from "./interfaces/FitnessFunctionInterface";

class Evaluator implements EvaluatorInterface {
    fitnessFunctions: Array<EvaluatorFunctionType>;
    evaluator: FitnessFunctionInterface | null;

    constructor(fitnessFunctions: Array<EvaluatorFunctionType>) {
        this.fitnessFunctions = fitnessFunctions;
        this.evaluator = this.createEvaluationChain();
    }

    evaluate(agent: AgentInterface, referenceImage: JimpImageInterface): void {
        agent.fitnessScore = this.evaluator?.evaluate(agent, referenceImage) ?? 0;
    }

    createEvaluationChain(): FitnessFunctionInterface | null {
        let stack: FitnessFunctionInterface | null = null;
        this.fitnessFunctions.forEach((fitness: EvaluatorFunctionType) => {
            if (stack === null) {
                stack = new fitness.fn(fitness.weight, null);
            } else {
                stack = new fitness.fn(fitness.weight, stack);
            }
        });

        return stack;
    }
}

export default Evaluator;
