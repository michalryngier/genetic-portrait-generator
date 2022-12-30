"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FitnessFunction {
    constructor(weight = 1, decorator) {
        this.weight = weight;
        this.decorator = decorator;
    }
    _evaluate(agent, referenceImage) {
        if (this.decorator) {
            return this.decorator.evaluate(agent, referenceImage);
        }
        return 0;
    }
    evaluate(agent, referenceImage) {
        return 0 * this.weight + this._evaluate(agent, referenceImage);
    }
}
exports.default = FitnessFunction;
//# sourceMappingURL=FitnessFunction.js.map