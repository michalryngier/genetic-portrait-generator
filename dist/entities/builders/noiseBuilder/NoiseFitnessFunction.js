"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FitnessFunction_1 = __importDefault(require("../../genetics/FitnessFunction"));
const ColorHelper_1 = __importDefault(require("../../../helpers/ColorHelper"));
class NoiseFitnessFunction extends FitnessFunction_1.default {
    performEvaluation(agent, referenceImage) {
        const agentBezier = agent.getUpdatedBezierCurve();
        let sumOfCoverage = 0, step = 1 / agentBezier.divider;
        for (let t = 0; t <= 1; t += step) {
            const start = Date.now();
            let point = agentBezier.getPoint(t);
            console.log(Date.now() - start);
            if (!isNaN(point.x) && !isNaN(point.y)) {
                if ((point.x >= referenceImage.width || point.y >= referenceImage.height)) {
                    return 0;
                }
                if (point.x <= 0 || point.y <= 0) {
                    return 0;
                }
                sumOfCoverage +=
                    referenceImage.getColorOnPosition(point, agentBezier.thickness) / ColorHelper_1.default.white;
            }
            else {
                return 0;
            }
        }
        return Math.exp(-sumOfCoverage);
    }
}
exports.default = NoiseFitnessFunction;
//# sourceMappingURL=NoiseFitnessFunction.js.map