"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StringHelper_1 = __importDefault(require("../../../helpers/StringHelper"));
const ConfigurationProvider_1 = __importDefault(require("../../../providers/ConfigurationProvider"));
const MathHelper_1 = __importDefault(require("../../../helpers/MathHelper"));
class NoiseCrosser {
    crossover(agent1, agent2, crossoverChance) {
        const rand = MathHelper_1.default.rand(1);
        if (crossoverChance * agent1.fitnessScore < rand ||
            crossoverChance * agent2.fitnessScore < rand) {
            return [agent1, agent2];
        }
        let gr1 = agent1.geneticRepresentation;
        let gr2 = agent2.geneticRepresentation;
        let maxCuttingPoint = gr1.length > gr2.length ? gr1.length : gr2.length;
        let cuttingPoints = [];
        for (let i = 0; i < ConfigurationProvider_1.default.CROSS_OVER_POINTS; i++) {
            cuttingPoints.push(MathHelper_1.default.randInt(maxCuttingPoint, 0));
        }
        cuttingPoints.sort((a, b) => a - b);
        for (let k = 0; k < cuttingPoints.length; k++) {
            let cuttingPoint = cuttingPoints[k];
            let cut1 = gr1.slice(cuttingPoint);
            let cut2 = gr2.slice(cuttingPoint);
            gr1 = StringHelper_1.default.replaceStringFromIndex(gr1, cut2, cuttingPoint);
            gr2 = StringHelper_1.default.replaceStringFromIndex(gr2, cut1, cuttingPoint);
        }
        agent1.geneticRepresentation = gr1;
        agent2.geneticRepresentation = gr2;
        return [agent1, agent2];
    }
}
exports.default = NoiseCrosser;
//# sourceMappingURL=NoiseCrosser.js.map