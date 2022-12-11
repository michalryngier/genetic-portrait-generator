import LoggerServiceInterface from "../interfaces/LoggerServiceInterface";
import LoggerInterface from "../interfaces/LoggerInterface";
import ConsoleLogger from "./ConsoleLogger";

class LoggerService implements LoggerServiceInterface {
    public static SHOW_LOGS = true;
    public static SHOW_DEBUGS = true;
    public static SHOW_WARNS = true;
    public static SHOW_ERRORS = true;
    public static SHOW_LOADING = true;

    get logger(): LoggerInterface {
        return LoggerService._logger;
    }

    public static _logger: LoggerInterface = new ConsoleLogger();
    private static instance: LoggerServiceInterface | undefined;

    private static getLogger(): LoggerInterface {
        if (!this.instance) {
            this.instance = new LoggerService()
        }

        return this.instance.logger;
    }

    public static log(msg: string): void {
        if (this.SHOW_LOGS) {
            this.getLogger().log(msg);
        }
    }

    public static debug(msg: string): void {
        if (this.SHOW_DEBUGS) {
            this.getLogger().debug(msg);
        }
    }

    public static warn(msg: string): void {
        if (this.SHOW_WARNS) {
            this.getLogger().warn(msg);
        }
    }

    public static error(msg: string): void {
        if (this.SHOW_ERRORS) {
            this.getLogger().error(msg);
        }
    }

    public static loading(msg: string): void {
        if (this.SHOW_LOADING) {
            this.getLogger().loading(msg);
        }
    }
}

export default LoggerService;