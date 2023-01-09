"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BezierCurve_1 = __importDefault(require("../../graphics/BezierCurve"));
const MathHelper_1 = __importDefault(require("../../../helpers/MathHelper"));
const StrictAgent_1 = __importDefault(require("./StrictAgent"));
class StrictPopulator {
    createPopulation(populationConfig) {
        let curves = [];
        for (let i = 0; i < populationConfig.size; i++) {
            curves.push(BezierCurve_1.default.getRandomCurve(populationConfig.maxPoint, MathHelper_1.default.randInt(populationConfig.nofPointsMax, populationConfig.nofPointsMin), MathHelper_1.default.randInt(populationConfig.thicknessMax, populationConfig.thicknessMin), populationConfig.divider));
        }
        return this.createAgentsFromCurves(curves);
    }
    createAgentsFromCurves(curves) {
        let agents = [];
        curves.forEach((curve) => agents.push(new StrictAgent_1.default(curve)));
        return agents;
    }
}
exports.default = StrictPopulator;
//# sourceMappingURL=StrictPopulator.js.map