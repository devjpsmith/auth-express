import { Request, Response, NextFunction } from 'express';
import logger from 'lib/logger';

export default async (req: Request, res: Response, next: NextFunction) => {
    const now = new Date();
    logger.info(`New request logged at ${req.url}`);

    res.on('finish', () => {
        logger.info(`Request completed in ${new Date().getTime() - now.getTime()}ms`);
    })
    next();
}
