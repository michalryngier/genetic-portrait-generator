class StringHelper {
    static createString(char: string, len: number): string {
        let str = "";
        for (let i = 0; i < len; i++) {
            str += char;
        }

        return str;
    }

    static replaceStringFromIndex(
        str: string,
        replaceWith: string,
        startingAt: number
    ): string {
        return str.slice(0, startingAt) + replaceWith;
    }

    static chunkString(str: string, size: number): Array<string> {
        let numberOfChunks = str.length / size,
            chunks = [];

        for (let i = 0; i < numberOfChunks; i++) {
            chunks[i] = str.substring(i * size, i * size + size);
        }

        return chunks;
    }
}

export default StringHelper;
