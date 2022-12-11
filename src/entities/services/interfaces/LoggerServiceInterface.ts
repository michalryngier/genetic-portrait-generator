import LoggerInterface from "./LoggerInterface";

interface LoggerServiceInterface {
    get logger(): LoggerInterface;
}

export default LoggerServiceInterface;