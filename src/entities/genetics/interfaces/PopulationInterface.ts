import PointInterface from "../../graphics/interfaces/PointInterface";

interface PopulationInterface {
    maxPoint: PointInterface;
    nofPointMax: number;
    nofPointsMin: number;
    thicknessMax: number;
    thicknessMin: number;
    bezierPoints: number;
    size: number;
}

export default PopulationInterface;