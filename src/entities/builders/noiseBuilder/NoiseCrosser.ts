import CrosserInterface from "../../genetics/interfaces/CrosserInterface";
import AgentInterface from "../../genetics/interfaces/AgentInterface";
import StringHelper from "../../../helpers/StringHelper";
import ConfigurationProvider from "../../../providers/ConfigurationProvider";
import MathHelper from "../../../helpers/MathHelper";

class NoiseCrosser implements CrosserInterface {
    crossover(
        agent1: AgentInterface,
        agent2: AgentInterface,
        crossOverChance: number
    ): [AgentInterface, AgentInterface] {
        let gr1 = agent1.geneticRepresentation;
        let gr2 = agent2.geneticRepresentation;

        let maxCuttingPoint = gr1.length > gr2.length ? gr1.length : gr2.length;
        let cuttingPoints = [];

        for (let i = 0; i < ConfigurationProvider.CROSS_OVER_POINTS; i++) {
            cuttingPoints.push(MathHelper.randInt(maxCuttingPoint, 0));
        }
        cuttingPoints.sort((a, b) => a - b);

        for (let k = 0; k < cuttingPoints.length; k++) {
            let cuttingPoint = cuttingPoints[k];
            let cut1 = gr1.slice(cuttingPoint);
            let cut2 = gr2.slice(cuttingPoint);

            gr1 = StringHelper.replaceStringFromIndex(gr1, cut2, cuttingPoint);
            gr2 = StringHelper.replaceStringFromIndex(gr2, cut1, cuttingPoint);
        }

        agent1.geneticRepresentation = gr1;
        agent2.geneticRepresentation = gr2;

        return [agent1, agent2];
    }
}

export default NoiseCrosser;
