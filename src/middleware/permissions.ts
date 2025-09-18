import { Request, Response, NextFunction } from 'express';
import { urlDecodeToBase64 } from '../lib/utils';
import { Payload } from '../../types/jwt';
import logger from 'lib/logger';

export default function (req: Request, res: Response, next: NextFunction) {
    logger.debug('Running permissions middleware')
    const header = req.headers.authorization;
    if (!header) {
        logger.warn('No authorization header');
        next();
        return;
    }

    const access_token = header.split(' ')[1];
    const urlEncodedPayload = access_token.split('.')[1];
    const encodedPayload = urlDecodeToBase64(urlEncodedPayload);
    const payloadJson = Buffer.from(encodedPayload, 'base64').toString('utf8');
    const payload = JSON.parse(payloadJson) as Payload;

    if (!payload.permissions) {
        logger.debug('No permissions in access token');
        next();
        return;
    }
    logger.info(`User permissions: ${payload.permissions}`);
    req.user = {
        permissions: payload.permissions,
    };
    next();
    return;
}

export function authorize(permissions: string[]): (req: Request, res: Response, next: NextFunction) => void {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!req.user || !req.user.permissions || !req.user.permissions.every((x: string) => permissions.includes(x))) {
            res.status(403).send();
            next('Not authorized');
            return;
        }
        next();
    }
}
