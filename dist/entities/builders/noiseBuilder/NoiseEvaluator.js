"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NoiseEvaluator {
    constructor(fitnessFunctions) {
        this.fitnessFunctions = fitnessFunctions;
        this.evaluator = this.createEvaluator();
    }
    evaluate(agent, referenceImage) {
        var _a, _b;
        agent.fitnessScore = (_b = (_a = this.evaluator) === null || _a === void 0 ? void 0 : _a.evaluate(agent, referenceImage)) !== null && _b !== void 0 ? _b : 0;
    }
    createEvaluator() {
        let stack = null;
        this.fitnessFunctions.forEach((fitness) => {
            if (stack === null) {
                stack = new fitness.fn(fitness.weight, null);
            }
            else {
                stack = new fitness.fn(fitness.weight, stack);
            }
        });
        return stack;
    }
}
exports.default = NoiseEvaluator;
//# sourceMappingURL=NoiseEvaluator.js.map