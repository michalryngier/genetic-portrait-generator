import NoiseFitnessFunction from "../../builders/noiseBuilder/NoiseFitnessFunction";

type EvaluatorFunctionType = {
    fn: typeof NoiseFitnessFunction;
    weight: number;
};

export default EvaluatorFunctionType;
