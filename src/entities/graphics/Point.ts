import PointInterface from "./interfaces/PointInterface";

class Point implements PointInterface {
    x: number;
    y: number;

    constructor(x: number | undefined = 0, y: number | undefined = 0) {
        this.x = x ?? 0;
        this.y = y ?? 0;
    }
}

export default Point;