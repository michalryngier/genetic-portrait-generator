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

    public static lerp(start: number, end: number, t: number): number {
        return start + (end - start) * this.clamp(t, 1);
    }
}

export default MathHelper;
