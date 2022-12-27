class MathHelper {
    public static clamp(value: number, max: number): number {
        if (value < 0) {
            return 0;
        }
        if (value > max) {
            return max;
        }

        return value;
    }

    public static rand(max: number, min: number = 0): number {
        return Math.random() * (max + 1 - min) + min;
    }

    public static randInt(max: number, min: number = 0) {
        return parseInt(Math.floor(Math.random() * ((max + 1) - min) + min).toString());
    }

    public static lerp(start: number, end: number, t: number): number {
        return start + (end - start) * this.clamp(t, 1);
    }

    public static normalize(value: number, max: number, min: number) {
        if (max === min) {
            return 1;
        }
        return Math.abs((value - min) / (max - min));
    }

    public static decToBinary(dec: number, length: number) {
        let binary = dec.toString(2);
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

export default MathHelper;
