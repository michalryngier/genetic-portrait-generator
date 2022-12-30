import FitnessFunction from "../../genetics/FitnessFunction";
import AgentInterface from "../../genetics/interfaces/AgentInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";
import ColorHelper from "../../../helpers/ColorHelper";
import PointInterface from "../../graphics/interfaces/PointInterface";

class NoiseFitnessFunction extends FitnessFunction {
    evaluate(agent: AgentInterface, referenceImage: JimpImageInterface): number {
        const agentBezier = agent.getUpdatedBezierCurve();
        let sumOfCoverage = 0,
            points = agentBezier.bezierPoints,
            step = 1 / points;

        for (let t = 0; t <= 1; t += step) {
            let point: PointInterface = agentBezier.getPoint(t);
            if (!isNaN(point.x) && !isNaN(point.y)) {
                sumOfCoverage +=
                    referenceImage.getColorOnPosition(point, agentBezier.thickness) / ColorHelper.white;
            } else {
                sumOfCoverage = 0;
            }
        }
        let avg;
        if (sumOfCoverage === points) {
            avg = 0;
        } else if (sumOfCoverage === 0) {
            avg = 1;
        } else {
            avg = 1 / sumOfCoverage;
        }

        return avg * this.weight + this._evaluate(agent, referenceImage);
    }
}

export default NoiseFitnessFunction;
