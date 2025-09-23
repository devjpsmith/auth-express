import { Request } from 'express';
import { LogLevel } from '../../types/core/log-level';

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

export default class Logger {
    constructor(private readonly request: Request, private readonly level: LogLevel = LogLevel.debug) {
        if (!level) {
            this.level = getLogLevelFromString(process.env.LOG_LEVEL);
        }
    }

    debug(message: string) {
        if (this.level <= LogLevel.debug) {
            console.log(`[DEBUG] ${this.request.requestId} ${message}`);
        }
    }

    info(message: string) {
        if (this.level <= LogLevel.info) {
            console.log(`[INFO]  ${this.request.requestId} ${message}`);
        }
    }

    warn(message: string) {
        if (this.level <= LogLevel.warn) {
            console.log(`[WARN]  ${this.request.requestId} ${message}`);
        }
    }

    error(message: string) {
        if (this.level <= LogLevel.error) {
            console.log(`[ERROR] ${this.request.requestId} ${message}`);
        }
    }
}
