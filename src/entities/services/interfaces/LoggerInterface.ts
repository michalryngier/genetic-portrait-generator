interface LoggerInterface {
    log(msg: string): void;
    debug(msg: string): void;

    warn(msg: string): void;

    error(msg: string): void;

    loading(msg: string): void;
}

export default LoggerInterface;