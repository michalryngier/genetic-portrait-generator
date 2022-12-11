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
        let index = 0,
            newStr = str.slice(0, startingAt);

        for (let i = 0; i < replaceWith.length; i++, index++) {
            newStr += replaceWith.charAt(index);
        }

        return newStr;
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
