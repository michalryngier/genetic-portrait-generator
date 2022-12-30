import LoggerServiceInterface from "../interfaces/LoggerServiceInterface";
import LoggerInterface from "../interfaces/LoggerInterface";
declare class LoggerService implements LoggerServiceInterface {
    static SHOW_LOGS: boolean;
    static SHOW_DEBUGS: boolean;
    static SHOW_WARNS: boolean;
    static SHOW_ERRORS: boolean;
    static SHOW_LOADING: boolean;
    get loggers(): Array<LoggerInterface>;
    static _loggers: Array<LoggerInterface>;
    private static instance;
    private static getLoggers;
    static log(msg: string): void;
    static debug(msg: string): void;
    static warn(msg: string): void;
    static error(msg: string): void;
    static loading(msg: string): void;
}
export default LoggerService;
//# sourceMappingURL=LoggerService.d.ts.map