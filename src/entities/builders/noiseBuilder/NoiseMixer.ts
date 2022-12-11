import MixerInterface from "../../genetics/interfaces/MixerInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";
import EvaluatorInterface from "../../genetics/interfaces/EvaluatorInterface";
import CrosserInterface from "../../genetics/interfaces/CrosserInterface";
import AgentInterface from "../../genetics/interfaces/AgentInterface";
import MutatorInterface from "../../genetics/interfaces/MutatorInterface";
import LoggerService from "../../../services/logger/LoggerService";
import MathHelper from "../../../helpers/MathHelper";
import _ from "lodash";

class NoiseMixer implements MixerInterface {
    mix(
        agents: Array<AgentInterface>,
        mutator: MutatorInterface,
        crosser: CrosserInterface,
        evaluator: EvaluatorInterface,
        referenceImage: JimpImageInterface,
        mutationChance: number,
        crossOverChance: number,
        nofMixes: number
    ): void {
        for (let i = 0; i < nofMixes; i++) {
            agents.forEach((agent) => evaluator.evaluate(agent, referenceImage));
            agents = this.sortAgents(agents);
            agents = this.normalizeAgents(agents);
            this.crossover(agents, crosser, crossOverChance);
            this.mutation(agents, mutator, mutationChance);

            LoggerService.loading((((i + 1) / nofMixes) * 100).toString());
        }
    }

    private sortAgents(agents: Array<AgentInterface>): Array<AgentInterface> {
        return agents.sort((a, b) => b.fitnessScore - a.fitnessScore);
    }

    private normalizeAgents(agents: Array<AgentInterface>): Array<AgentInterface> {
        let min = agents[0].fitnessScore,
            max = agents[agents.length - 1].fitnessScore;

        agents.forEach((agent) => {
            agent.fitnessScore = MathHelper.normalize(agent.fitnessScore, max, min);
        });

        return agents;
    }

    private crossover(agents: Array<AgentInterface>, crosser: CrosserInterface, crossOverChance: number) {
        let agentsCopy: Array<AgentInterface> = _.cloneDeep<Array<AgentInterface>>(agents);
        let usedIndexes = [];

        while (usedIndexes.length < agents.length) {
            let [agent1, agent1Index] = this.drawAgent(agentsCopy);
            usedIndexes.push(agent1Index);
            let [agent2, agent2Index] = this.drawAgent(agentsCopy);
            usedIndexes.push(agent2Index);

            if (agent1 && agent2) {
                [agent1, agent2] = crosser.crossover(agent1, agent2, crossOverChance);
            }
        }
    }

    mutation(agents: Array<AgentInterface>, mutator: MutatorInterface, mutationChance: number) {
        for (let i = 0; i < agents.length; i++) {
            agents[i] = mutator.mutate(agents[i], mutationChance);
        }
    }

    private drawAgent(agents: Array<AgentInterface>): [AgentInterface, number] {
        let index = Number.parseInt(MathHelper.rand(agents.length - 1).toString());
        let agent = agents[index];

        return [agent, index];
    }
}

export default NoiseMixer;
