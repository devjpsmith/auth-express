import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import Logger from 'lib/logger';

export default async (req: Request, res: Response, next: NextFunction) => {
    req.requestId = randomUUID();
    req.logger = new Logger(req);
    const now = new Date();
    req.logger?.info(`New request logged at ${req.url}`);

    res.on('finish', () => {
        req.logger?.info(`Request completed in ${new Date().getTime() - now.getTime()}ms`);
    })
    next();
}
