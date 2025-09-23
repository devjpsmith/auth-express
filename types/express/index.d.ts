import 'express';
import Logger from '../../src/lib/logger';

declare module 'express' {
    interface Request {
        user?: { permissions: string[] };
        requestId?: string;
        logger?: Logger;
    }
}
