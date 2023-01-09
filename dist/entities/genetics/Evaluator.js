"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Evaluator {
    constructor(fitnessFunctions) {
        this.fitnessFunctions = fitnessFunctions;
        this.evaluator = this.createEvaluationChain();
    }
    evaluate(agent, referenceImage) {
        var _a, _b;
        agent.fitnessScore = (_b = (_a = this.evaluator) === null || _a === void 0 ? void 0 : _a.evaluate(agent, referenceImage)) !== null && _b !== void 0 ? _b : 0;
    }
    createEvaluationChain() {
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
exports.default = Evaluator;
//# sourceMappingURL=Evaluator.js.map