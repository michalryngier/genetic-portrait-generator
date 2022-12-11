import AgentInterface from "../../genetics/interfaces/AgentInterface";
import EvaluatorInterface from "../../genetics/interfaces/EvaluatorInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";
import EvaluatorFunctionType from "../../genetics/types/EvaluatorFunctionType";
import FitnessFunctionInterface from "../../genetics/interfaces/FitnessFunctionInterface";

class NoiseEvaluator implements EvaluatorInterface {
    fitnessFunctions: Array<EvaluatorFunctionType>;
    evaluator: FitnessFunctionInterface | null;

    constructor(fitnessFunctions: Array<EvaluatorFunctionType>) {
        this.fitnessFunctions = fitnessFunctions;
        this.evaluator = this.createEvaluator();
    }

    evaluate(agent: AgentInterface, referenceImage: JimpImageInterface): void {
        agent.fitnessScore = this.evaluator?.evaluate(agent, referenceImage) ?? 0;
    }

    private createEvaluator(): FitnessFunctionInterface | null {
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

export default NoiseEvaluator;
