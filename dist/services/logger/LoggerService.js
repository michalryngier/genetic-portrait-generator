"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConsoleLogger_1 = __importDefault(require("./ConsoleLogger"));
class LoggerService {
    get loggers() {
        return LoggerService._loggers;
    }
    static getLoggers() {
        if (!this.instance) {
            this.instance = new LoggerService();
        }
        return this.instance.loggers;
    }
    static log(msg) {
        if (this.SHOW_LOGS) {
            this.getLoggers().forEach((logger) => logger.log(msg));
        }
    }
    static debug(msg) {
        if (this.SHOW_DEBUGS) {
            this.getLoggers().forEach((logger) => logger.debug(msg));
        }
    }
    static warn(msg) {
        if (this.SHOW_WARNS) {
            this.getLoggers().forEach((logger) => logger.warn(msg));
        }
    }
    static error(msg) {
        if (this.SHOW_ERRORS) {
            this.getLoggers().forEach((logger) => logger.error(msg));
        }
    }
    static loading(msg) {
        if (this.SHOW_LOADING) {
            this.getLoggers().forEach((logger) => logger.loading(msg));
        }
    }
}
LoggerService.SHOW_LOGS = true;
LoggerService.SHOW_DEBUGS = true;
LoggerService.SHOW_WARNS = true;
LoggerService.SHOW_ERRORS = true;
LoggerService.SHOW_LOADING = true;
LoggerService._loggers = [new ConsoleLogger_1.default()];
exports.default = LoggerService;
//# sourceMappingURL=LoggerService.js.map