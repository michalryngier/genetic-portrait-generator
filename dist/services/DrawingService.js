"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ColorHelper_1 = __importDefault(require("../helpers/ColorHelper"));
class DrawingService {
    constructor(originalImage) {
        this.originalImage = originalImage;
    }
    draw(agents, image, config) {
        agents.forEach((agent) => {
            var _a, _b;
            if (agent.fitnessScore > 0) {
                image.drawBezier(agent.getUpdatedBezierCurve(), this.originalImage, this.getColor((_a = config === null || config === void 0 ? void 0 : config.color) !== null && _a !== void 0 ? _a : null), (_b = config === null || config === void 0 ? void 0 : config.lerpColor) !== null && _b !== void 0 ? _b : false);
            }
        });
    }
    getColor(color) {
        if (color) {
            return ColorHelper_1.default.getColorFromHex(color);
        }
        return null;
    }
}
exports.default = DrawingService;
//# sourceMappingURL=DrawingService.js.map