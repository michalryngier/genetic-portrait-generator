"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MathHelper_1 = __importDefault(require("../../../helpers/MathHelper"));
const lodash_1 = __importDefault(require("lodash"));
class NoiseMixer {
    mix(agents, mutator, crosser, evaluator, referenceImage, mutationChance, crossoverChance, nofMixes) {
        for (let i = 0; i < nofMixes; i++) {
            agents.forEach((agent) => evaluator.evaluate(agent, referenceImage));
            agents = this.sortAgents(agents);
            agents = this.normalizeAgents(agents);
            this.crossover(agents, crosser, crossoverChance);
            this.mutation(agents, mutator, mutationChance);
        }
        agents.forEach((agent) => evaluator.evaluate(agent, referenceImage));
        return agents;
    }
    sortAgents(agents) {
        return agents.sort((a, b) => b.fitnessScore - a.fitnessScore);
    }
    normalizeAgents(agents) {
        let min = agents[0].fitnessScore, max = agents[agents.length - 1].fitnessScore;
        agents.forEach((agent) => {
            agent.fitnessScore = MathHelper_1.default.normalize(agent.fitnessScore, max, min);
        });
        return agents;
    }
    crossover(agents, crosser, crossoverChance) {
        let agentsCopy = lodash_1.default.cloneDeep(agents);
        let usedIndexes = [];
        while (usedIndexes.length < agents.length) {
            let [agent1, agent1Index] = this.drawAgent(agentsCopy);
            usedIndexes.push(agent1Index);
            let [agent2, agent2Index] = this.drawAgent(agentsCopy);
            usedIndexes.push(agent2Index);
            if (agent1 && agent2) {
                [agent1, agent2] = crosser.crossover(agent1, agent2, crossoverChance);
                agents[agent1Index].geneticRepresentation = agent1.geneticRepresentation;
                agents[agent2Index].geneticRepresentation = agent2.geneticRepresentation;
            }
        }
    }
    mutation(agents, mutator, mutationChance) {
        for (let i = 0; i < agents.length; i++) {
            agents[i] = mutator.mutate(agents[i], mutationChance);
        }
    }
    drawAgent(agents) {
        let index = Number.parseInt(MathHelper_1.default.rand(agents.length - 1).toString());
        let agent = agents[index];
        return [agent, index];
    }
}
exports.default = NoiseMixer;
//# sourceMappingURL=NoiseMixer.js.map