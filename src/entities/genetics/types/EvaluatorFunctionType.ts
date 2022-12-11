import OutlineFitnessFunction from "../../builders/outlineBuilder/OutlineFitnessFunction";

type EvaluatorFunctionType = {
    fn: typeof OutlineFitnessFunction;
    weight: number
}

export default EvaluatorFunctionType;