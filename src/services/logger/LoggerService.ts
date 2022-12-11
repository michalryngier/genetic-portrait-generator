import LoggerServiceInterface from "../interfaces/LoggerServiceInterface";
import LoggerInterface from "../interfaces/LoggerInterface";
import ConsoleLogger from "./ConsoleLogger";

class LoggerService implements LoggerServiceInterface {
    public static SHOW_LOGS = true;
    public static SHOW_DEBUGS = true;
    public static SHOW_WARNS = true;
    public static SHOW_ERRORS = true;
    public static SHOW_LOADING = true;

    get loggers(): Array<LoggerInterface> {
        return LoggerService._loggers;
    }

    public static _loggers: Array<LoggerInterface> = [new ConsoleLogger()];
    private static instance: LoggerServiceInterface | undefined;

    private static getLoggers(): Array<LoggerInterface> {
        if (!this.instance) {
            this.instance = new LoggerService();
        }

        return this.instance.loggers;
    }

    public static log(msg: string): void {
        if (this.SHOW_LOGS) {
            this.getLoggers().forEach((logger) => logger.log(msg));
        }
    }

    public static debug(msg: string): void {
        if (this.SHOW_DEBUGS) {
            this.getLoggers().forEach((logger) => logger.debug(msg));
        }
    }

    public static warn(msg: string): void {
        if (this.SHOW_WARNS) {
            this.getLoggers().forEach((logger) => logger.warn(msg));
        }
    }

    public static error(msg: string): void {
        if (this.SHOW_ERRORS) {
            this.getLoggers().forEach((logger) => logger.error(msg));
        }
    }

    public static loading(msg: string): void {
        if (this.SHOW_LOADING) {
            this.getLoggers().forEach((logger) => logger.loading(msg));
        }
    }
}

export default LoggerService;
