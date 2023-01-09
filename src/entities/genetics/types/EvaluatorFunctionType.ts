import {FitnessFunction} from "../index";

type EvaluatorFunctionType = {
    fn: typeof FitnessFunction;
    weight: number;
};

export default EvaluatorFunctionType;
