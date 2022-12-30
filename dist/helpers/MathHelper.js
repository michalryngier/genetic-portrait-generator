"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MathHelper {
    static clamp(value, max) {
        if (value < 0) {
            return 0;
        }
        if (value > max) {
            return max;
        }
        return value;
    }
    static rand(max, min = 0) {
        return Math.random() * (max + 1 - min) + min;
    }
    static randInt(max, min = 0) {
        return parseInt(Math.floor(Math.random() * ((max + 1) - min) + min).toString());
    }
    static lerp(start, end, t) {
        return start + (end - start) * this.clamp(t, 1);
    }
    static normalize(value, max, min) {
        if (max === min) {
            return 1;
        }
        return Math.abs((value - min) / (max - min));
    }
    static decToBinary(dec, length) {
        let binary = dec.toString(2);
        if (binary.length < length) {
            let diff = length - binary.length, prepend = "";
            for (let i = 0; i < diff; i++) {
                prepend += "0";
            }
            binary = prepend + binary;
        }
        return binary;
    }
    static binaryToDec(binary) {
        return parseInt(binary, 2);
    }
}
exports.default = MathHelper;
//# sourceMappingURL=MathHelper.js.map