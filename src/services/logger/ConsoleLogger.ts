import LoggerInterface from "../interfaces/LoggerInterface";

class ConsoleLogger implements LoggerInterface {
    debug(msg: string): void {
        console.log(msg);
    }

    error(msg: string): void {
        console.error(msg);
    }

    loading(msg: string): void {
        const percentage = Number.parseInt(msg);
        console.clear();
        let loadingBar = "";
        loadingBar += createString("▓", Math.round(percentage));
        loadingBar += createString("░", 100 - Math.round(percentage));
        loadingBar += "  " + Math.round(percentage * 100) / 100 + "%";
        console.debug(loadingBar);
        console.log();

        function createString(char: string, len: number) {
            let str = "";
            for (let i = 0; i < len; i++) {
                str += char;
            }

            return str;
        }
    }

    log(msg: string): void {
        console.log(msg);
    }

    warn(msg: string): void {
        console.warn(msg);
    }
}

export default ConsoleLogger;
