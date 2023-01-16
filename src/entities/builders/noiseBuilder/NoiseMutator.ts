import MutatorInterface from "../../genetics/interfaces/MutatorInterface";
import AgentInterface from "../../genetics/interfaces/AgentInterface";
import MathHelper from "../../../helpers/MathHelper";
import ConfigurationProvider from "../../../providers/ConfigurationProvider";

class NoiseMutator implements MutatorInterface {
    mutate(agent: AgentInterface, mutationChance: number): AgentInterface {
        let gr = agent.geneticRepresentation.split("");
        gr = gr.map((bit, index) => {
            let factor;
            if (agent.fitnessScore === 0) {
                factor = mutationChance;
            } else {
                factor = agent.fitnessScore * mutationChance
            }

            let rn = MathHelper.rand(1);
            let doMutation = factor >= rn;
            if (ConfigurationProvider.SIGNIFICANT_ALLELES >= (index % (ConfigurationProvider.ALLELE_LENGTH - 1))) {
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

export default NoiseMutator;
