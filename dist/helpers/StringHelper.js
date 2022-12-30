"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StringHelper {
    static createString(char, len) {
        let str = "";
        for (let i = 0; i < len; i++) {
            str += char;
        }
        return str;
    }
    static replaceStringFromIndex(str, replaceWith, startingAt) {
        return str.slice(0, startingAt) + replaceWith;
    }
    static chunkString(str, size) {
        let numberOfChunks = str.length / size, chunks = [];
        for (let i = 0; i < numberOfChunks; i++) {
            chunks[i] = str.substring(i * size, i * size + size);
        }
        return chunks;
    }
}
exports.default = StringHelper;
//# sourceMappingURL=StringHelper.js.map