"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Agent {
    constructor(bezierCurve) {
        this.fitnessScore = 0;
        this.geneticRepresentation = '';
        this.bezierCurve = bezierCurve;
        this.buildGeneticRepresentation();
    }
    buildGeneticRepresentation() {
        this.geneticRepresentation = this.bezierCurve.asBinary();
    }
    getUpdatedBezierCurve() {
        this.updateBezierCurve();
        return this.bezierCurve;
    }
    updateBezierCurve() {
        this.bezierCurve.updateFromBinary(this.geneticRepresentation);
    }
}
exports.default = Agent;
//# sourceMappingURL=Agent.js.map