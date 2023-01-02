"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const Point_1 = __importDefault(require("./Point"));
const MathHelper_1 = __importDefault(require("../../helpers/MathHelper"));
const StringHelper_1 = __importDefault(require("../../helpers/StringHelper"));
const ConfigurationProvider_1 = __importDefault(require("../../providers/ConfigurationProvider"));
class BezierCurve {
    constructor(start = { x: 0, y: 0 }, end = { x: 0, y: 0 }, points = [], thickness = 1, divider = 100) {
        this.start = new Point_1.default(0, 0);
        this.end = new Point_1.default(0, 0);
        this.points = [];
        this.thickness = 1;
        this.divider = 100;
        this.start = start;
        this.end = end;
        this.points = points;
        this.thickness = thickness;
        this.divider = divider;
    }
    static getRandomCurve(maxPoint, nofPoints = 1, thickness = 1, divider = 100) {
        let start = new Point_1.default(MathHelper_1.default.rand(maxPoint.x), MathHelper_1.default.rand(maxPoint.y)), end = new Point_1.default(MathHelper_1.default.rand(maxPoint.x), MathHelper_1.default.rand(maxPoint.y)), points = [];
        for (let i = 0; i < nofPoints; i++) {
            points.push(new Point_1.default(MathHelper_1.default.rand(maxPoint.x), MathHelper_1.default.rand(maxPoint.y)));
        }
        return new BezierCurve(start, end, points, thickness, divider);
    }
    getPoint(t) {
        let points = [];
        this.points.forEach((p) => points.push(new Point_1.default(p.x, p.y)));
        return this.interpolate(t, [
            new Point_1.default(this.start.x, this.start.y),
            ...points,
            new Point_1.default(this.end.x, this.end.y),
        ]);
    }
    setProperties(start, end, points, thickness = null) {
        this.start = start;
        this.end = end;
        this.thickness = thickness !== null && thickness !== void 0 ? thickness : this.thickness;
        this.points = points;
    }
    interpolate(t, points) {
        if (t === 0) {
            return points[0];
        }
        const order = points.length - 1;
        if (t === 1) {
            return points[order];
        }
        const mt = 1 - t;
        let p = points;
        if (order === 1) {
            return new Point_1.default(mt * p[0].x + t * p[1].x, mt * p[0].y + t * p[1].y);
        }
        if (order >= 2 && order < 4) {
            let mt2 = mt * mt, t2 = t * t, a, b, c, d = 0;
            if (order === 2) {
                p = [p[0], p[1], p[2], new Point_1.default(0, 0)];
                a = mt2;
                b = mt * t * 2;
                c = t2;
            }
            else {
                a = mt2 * mt;
                b = mt2 * t * 3;
                c = mt * t2 * 3;
                d = t * t2;
            }
            return new Point_1.default(a * p[0].x + b * p[1].x + c * p[2].x + d * p[3].x, a * p[0].y + b * p[1].y + c * p[2].y + d * p[3].y);
        }
        const dCpts = points.map(p => new Point_1.default(p.x, p.y));
        while (dCpts.length > 1) {
            for (let i = 0; i < dCpts.length - 1; i++) {
                dCpts[i] = new Point_1.default(dCpts[i].x + (dCpts[i + 1].x - dCpts[i].x) * t, dCpts[i].y + (dCpts[i + 1].y - dCpts[i].y) * t);
            }
            dCpts.splice(dCpts.length - 1, 1);
        }
        return dCpts[0];
    }
    asBinary() {
        const ALLELE_LENGTH = ConfigurationProvider_1.default.ALLELE_LENGTH;
        let startX = MathHelper_1.default.decToBinary(this.start.x, ALLELE_LENGTH);
        let startY = MathHelper_1.default.decToBinary(this.start.y, ALLELE_LENGTH);
        let endX = MathHelper_1.default.decToBinary(this.end.x, ALLELE_LENGTH);
        let endY = MathHelper_1.default.decToBinary(this.end.y, ALLELE_LENGTH);
        let points = [];
        this.points.forEach((point) => {
            points.push(MathHelper_1.default.decToBinary(point.x, ALLELE_LENGTH));
            points.push(MathHelper_1.default.decToBinary(point.y, ALLELE_LENGTH));
        });
        return startX + startY + endX + endY + points.join("");
    }
    updateFromBinary(binaryRepresentation) {
        const ALLELE_LENGTH = ConfigurationProvider_1.default.ALLELE_LENGTH;
        if (!binaryRepresentation) {
            return;
        }
        let chunks = StringHelper_1.default.chunkString(binaryRepresentation, ALLELE_LENGTH);
        chunks = chunks.map((el) => MathHelper_1.default.binaryToDec(el));
        const start = new Point_1.default(chunks.shift(), chunks.shift());
        const end = new Point_1.default(chunks.shift(), chunks.shift());
        const points = lodash_1.default.chunk(chunks, 2).map((chunk) => {
            return new Point_1.default(chunk[0], chunk[1]);
        });
        this.setProperties(start, end, points, null);
    }
}
exports.default = BezierCurve;
//# sourceMappingURL=BezierCurve.js.map