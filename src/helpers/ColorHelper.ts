import Jimp from "jimp";
import MathHelper from "./MathHelper";

class ColorHelper {
    public static white = Jimp.rgbaToInt(255, 255, 255, 255);
    public static black = Jimp.rgbaToInt(0, 0, 0, 255);
    public static red = Jimp.rgbaToInt(255, 0, 0, 255);
    public static green = Jimp.rgbaToInt(0, 255, 0, 255);
    public static blue = Jimp.rgbaToInt(0, 0, 255, 255);
    public static transparent = Jimp.rgbaToInt(0, 0, 0, 0);

    public static getRandomColor(alpha: number = 255): number {
        return Jimp.rgbaToInt(MathHelper.rand(255), MathHelper.rand(255), MathHelper.rand(255), alpha);
    }

    public static getColorWithAlpha(color: number, alpha = 255): number {
        let rgba = Jimp.intToRGBA(color);

        return Jimp.rgbaToInt(rgba.r, rgba.g, rgba.b, alpha);
    }

    public static getColorFromHex(hex: string) {
        hex = hex.replace(/#/gi, '');
        if (hex.length === 6) {
            hex += "ff";
        }
        let decimal = this.hexToDec(hex), color = Jimp.intToRGBA(decimal);

        return Jimp.rgbaToInt(color.r, color.g, color.b, color.a);
    }

    public static decToHex(dec: number): string {
        return dec.toString(16);
    }

    public static decToHexAlpha(dec: string): string {
        return parseInt(dec).toString(16) + "ff";
    }

    public static hexAlphaToHex(hexAlpha: string): string {
        return hexAlpha.substring(0, hexAlpha.length - 2);
    }

    public static hexAlphaToDecNoAlpha(hexAlpha: string): number {
        return this.hexToDec(this.hexAlphaToHex(hexAlpha));
    }

    public static hexToDec(hex: string): number {
        return hex.length ? parseInt(hex, 16) : 0;
    }

    public static decToBinary(dec: string, length: number) {
        let binary = parseInt(dec).toString(2);
        if (binary.length < length) {
            let diff = length - binary.length,
                prepend = "";
            for (let i = 0; i < diff; i++) {
                prepend += "0";
            }
            binary = prepend + binary;
        }

        return binary;
    }

    public static binaryToDec(binary: string) {
        return parseInt(binary, 2);
    }
}

export default ColorHelper;