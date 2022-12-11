import PointInterface from "../../graphics/interfaces/PointInterface";

type PopulationType = {
    maxPoint: PointInterface;
    nofPointsMax: number;
    nofPointsMin: number;
    thicknessMax: number;
    thicknessMin: number;
    bezierPoints: number;
    size: number;
};

export default PopulationType;
