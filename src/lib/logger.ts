import { LogLevel } from '../../types/core/log-level';

class Logger {
    constructor(private readonly level: LogLevel = LogLevel.debug) {

    }

    debug(message: string) {
        if (this.level <= LogLevel.debug) {
            console.log(`[DEBUG] ${message}`);
        }
    }

    info(message: string) {
        if (this.level <= LogLevel.info) {
            console.log(`[INFO]  ${message}`);
        }
    }

    warn(message: string) {
        if (this.level <= LogLevel.warn) {
            console.log(`[WARN]  ${message}`);
        }
    }

    error(message: string) {
        if (this.level <= LogLevel.error) {
            console.log(`[ERROR] ${message}`);
        }
    }
}

function getLogLevelFromString(str: string | undefined): LogLevel {
    if (!str)
        return LogLevel.debug;
    switch (str) {
        case 'error': return LogLevel.error;
        case 'warn': return LogLevel.warn;
        case 'info': return LogLevel.info;
        default: return LogLevel.debug;
    }
}

const logger = new Logger(getLogLevelFromString(process.env.LOG_LEVEL));

export default logger;
