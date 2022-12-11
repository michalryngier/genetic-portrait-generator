import LoggerInterface from "./LoggerInterface";

interface LoggerServiceInterface {
    get loggers(): Array<LoggerInterface>;
}

export default LoggerServiceInterface;
