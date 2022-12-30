import LoggerInterface from "../interfaces/LoggerInterface";
declare class ConsoleLogger implements LoggerInterface {
    debug(msg: string): void;
    error(msg: string): void;
    loading(msg: string): void;
    log(msg: string): void;
    warn(msg: string): void;
}
export default ConsoleLogger;
//# sourceMappingURL=ConsoleLogger.d.ts.map