declare class MathHelper {
    static clamp(value: number, max: number): number;
    static rand(max: number, min?: number): number;
    static randInt(max: number, min?: number): number;
    static lerp(start: number, end: number, t: number): number;
    static normalize(value: number, max: number, min: number): number;
    static decToBinary(dec: number, length: number): string;
    static binaryToDec(binary: string): number;
}
export default MathHelper;
//# sourceMappingURL=MathHelper.d.ts.map