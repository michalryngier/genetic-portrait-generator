"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jimp_1 = __importDefault(require("jimp"));
const MathHelper_1 = __importDefault(require("./MathHelper"));
class ColorHelper {
    static getRandomColor(alpha = 255) {
        return jimp_1.default.rgbaToInt(MathHelper_1.default.randInt(255), MathHelper_1.default.randInt(255), MathHelper_1.default.randInt(255), alpha);
    }
    static getColorWithAlpha(color, alpha = 255) {
        const rgba = jimp_1.default.intToRGBA(color);
        return jimp_1.default.rgbaToInt(rgba.r, rgba.g, rgba.b, alpha);
    }
    static getRGBAColorFromInt(color) {
        return jimp_1.default.intToRGBA(color);
    }
    static getColorFromHex(hex) {
        hex = hex.replace(/#/gi, "");
        if (hex.length === 6) {
            hex += "ff";
        }
        let decimal = this.hexToDec(hex), color = jimp_1.default.intToRGBA(decimal);
        return jimp_1.default.rgbaToInt(color.r, color.g, color.b, color.a);
    }
    static decToHex(dec) {
        return dec.toString(16);
    }
    static decToHexAlpha(dec) {
        return parseInt(dec).toString(16) + "ff";
    }
    static hexAlphaToHex(hexAlpha) {
        return hexAlpha.substring(0, hexAlpha.length - 2);
    }
    static hexAlphaToDecNoAlpha(hexAlpha) {
        return this.hexToDec(this.hexAlphaToHex(hexAlpha));
    }
    static hexToDec(hex) {
        return hex.length ? parseInt(hex, 16) : 0;
    }
}
ColorHelper.white = jimp_1.default.rgbaToInt(255, 255, 255, 255);
ColorHelper.black = jimp_1.default.rgbaToInt(0, 0, 0, 255);
ColorHelper.red = jimp_1.default.rgbaToInt(255, 0, 0, 255);
ColorHelper.green = jimp_1.default.rgbaToInt(0, 255, 0, 255);
ColorHelper.blue = jimp_1.default.rgbaToInt(0, 0, 255, 255);
ColorHelper.transparent = jimp_1.default.rgbaToInt(0, 0, 0, 0);
exports.default = ColorHelper;
//# sourceMappingURL=ColorHelper.js.map