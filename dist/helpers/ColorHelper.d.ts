declare class ColorHelper {
    static white: number;
    static black: number;
    static red: number;
    static green: number;
    static blue: number;
    static transparent: number;
    static getRandomColor(alpha?: number): number;
    static getColorWithAlpha(color: number, alpha?: number): number;
    static getColorFromHex(hex: string): number;
    static decToHex(dec: number): string;
    static decToHexAlpha(dec: string): string;
    static hexAlphaToHex(hexAlpha: string): string;
    static hexAlphaToDecNoAlpha(hexAlpha: string): number;
    static hexToDec(hex: string): number;
}
export default ColorHelper;
//# sourceMappingURL=ColorHelper.d.ts.map