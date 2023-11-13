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
const index_1 = require("./index");
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
        return index_1.interpolateCurve.interpolate(t, points);
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