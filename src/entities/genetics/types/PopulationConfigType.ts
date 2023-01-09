import PointInterface from "../../graphics/interfaces/PointInterface";

type PopulationConfigType = {
    maxPoint: PointInterface;
    nofPointsMax: number;
    nofPointsMin: number;
    thicknessMax: number;
    thicknessMin: number;
    divider: number;
    size: number;
};

export default PopulationConfigType;
