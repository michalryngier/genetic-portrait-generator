"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FitnessFunction {
    constructor(weight = 1, decorator) {
        this.weight = weight;
        this.decorator = decorator;
    }
    applyDecorator(agent, referenceImage) {
        if (this.decorator) {
            return this.decorator.evaluate(agent, referenceImage);
        }
        return 0;
    }
    evaluate(agent, referenceImage) {
        return this.performEvaluation(agent, referenceImage) * this.weight + this.applyDecorator(agent, referenceImage);
    }
    performEvaluation(agent, referenceImage) {
        return 0;
    }
    ;
}
exports.default = FitnessFunction;
//# sourceMappingURL=FitnessFunction.js.map