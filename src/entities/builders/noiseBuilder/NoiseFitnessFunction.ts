import FitnessFunction from "../../genetics/FitnessFunction";
import AgentInterface from "../../genetics/interfaces/AgentInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";
import ColorHelper from "../../../helpers/ColorHelper";
import PointInterface from "../../graphics/interfaces/PointInterface";

class NoiseFitnessFunction extends FitnessFunction {
    performEvaluation(agent: AgentInterface, referenceImage: JimpImageInterface): number {
        const agentBezier = agent.getUpdatedBezierCurve();
        let sumOfCoverage = 0,
            points = agentBezier.divider,
            step = 1 / points;

        for (let t = 0; t <= 1; t += step) {
            let point: PointInterface = agentBezier.getPoint(t);
            if (!isNaN(point.x) && !isNaN(point.y)) {
                if (point.x >= referenceImage.width || point.y >= referenceImage.height) {
                    return 0;
                }
                if (point.x <= 0 || point.y <= 0) {
                    return 0;
                }
                sumOfCoverage +=
                    referenceImage.getColorOnPosition(point, agentBezier.thickness) / ColorHelper.white;
            } else {
                return 0;
            }
        }

        return Math.exp(-sumOfCoverage);
    }
}

export default NoiseFitnessFunction;
