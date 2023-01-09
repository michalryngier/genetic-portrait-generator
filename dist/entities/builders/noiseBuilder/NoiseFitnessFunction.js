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
        let sumOfCoverage = 0, points = agentBezier.divider, step = 1 / points;
        for (let t = 0; t <= 1; t += step) {
            let point = agentBezier.getPoint(t);
            if (!isNaN(point.x) && !isNaN(point.y)) {
                if (point.x >= referenceImage.width || point.y >= referenceImage.height) {
                    sumOfCoverage = points;
                    break;
                }
                if (point.x <= 0 || point.y <= 0) {
                    sumOfCoverage = points;
                    break;
                }
                sumOfCoverage +=
                    referenceImage.getColorOnPosition(point, agentBezier.thickness) / ColorHelper_1.default.white;
            }
            else {
                sumOfCoverage = points;
                break;
            }
        }
        let avg;
        if (sumOfCoverage === points) {
            avg = 0;
        }
        else if (sumOfCoverage === 0) {
            avg = 1;
        }
        else {
            avg = 1 / sumOfCoverage;
        }
        return avg;
    }
}
exports.default = NoiseFitnessFunction;
//# sourceMappingURL=NoiseFitnessFunction.js.map