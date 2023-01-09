"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MathHelper_1 = __importDefault(require("../../../helpers/MathHelper"));
const ConfigurationProvider_1 = __importDefault(require("../../../providers/ConfigurationProvider"));
class StrictMutator {
    mutate(agent, chance) {
        let gr = agent.geneticRepresentation.split("");
        gr = gr.map((bit, index) => {
            let factor;
            if (agent.fitnessScore === 0) {
                factor = chance;
            }
            else {
                factor = agent.fitnessScore * chance;
            }
            let rn = MathHelper_1.default.rand(1);
            let doMutation = factor >= rn;
            if (4 >= (index % (ConfigurationProvider_1.default.ALLELE_LENGTH - 1))) {
                if (doMutation) {
                    return bit === "0" ? "1" : "0";
                }
            }
            return bit;
        });
        agent.geneticRepresentation = gr.join("");
        return agent;
    }
}
exports.default = StrictMutator;
//# sourceMappingURL=StrictMutator.js.map