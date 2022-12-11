import LoggerInterface from "../interfaces/LoggerInterface";

class ConsoleLogger implements LoggerInterface {
    debug(msg: string): void {
        console.log(msg);
    }

    error(msg: string): void {
        console.error(msg);
    }

    loading(msg: string): void {
        console.log(msg);
    }

    log(msg: string): void {
        console.log(msg);
    }

    warn(msg: string): void {
        console.warn(msg);
    }
}

export default ConsoleLogger;