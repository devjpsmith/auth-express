import { Request, Response, NextFunction } from 'express';
import { createVerify } from 'crypto';
import { urlDecodeToBase64 } from '../lib/utils';
import keyServiceBuilder from '../factories/key-service';
import { Header, Payload } from '../../types/jwt';

const keyService = keyServiceBuilder();

async function isValidAccessToken(access_token: string) {
    const [ urlEncodedHeader, urlEncodedPayload, urlEncodedSignature ] = access_token.split('.');
    const signingPayload = `${urlEncodedHeader}.${urlEncodedPayload}`;

    const signature = urlDecodeToBase64(urlEncodedSignature);
    const encodedHeader = urlDecodeToBase64(urlEncodedHeader);

    const headerJson = Buffer.from(encodedHeader, 'base64').toString('utf8');
    const headerObj = JSON.parse(headerJson) as Header;

    const keys = await keyService.getKeys();
    const key = keys.find(x => x.key_id === headerObj.kid);
    // if we can't find the proper key, consider this token invalid
    return key && createVerify('RSA-SHA256')
        .update(signingPayload)
        .verify(key.public_key, signature, 'base64');

}

function isValidPayload(access_token: string) {
    const urlEncodedPayload = access_token.split('.')[1];
    const encodedPayload = urlDecodeToBase64(urlEncodedPayload);
    const payloadJson = Buffer.from(encodedPayload, 'base64').toString('utf8');
    const payload = JSON.parse(payloadJson) as Payload;
    const now = Math.floor(Date.now() / 1000)
    return now < payload.exp;
}

function getAccessToken(access_token: string) {
    const parts = access_token.split(' ');
    if (parts.length == 2 && parts[0].includes('Bearer')) {
        return parts[1];
    }
    return null;
}

export default async function (req: Request, res: Response, next: NextFunction) {
    req.logger?.debug('Validating token authentication');
    // get token from header
    const header = req.headers.authorization;
    if (header){
        const access_token = getAccessToken(header);
        if (access_token && await isValidAccessToken(access_token) && isValidPayload(access_token)) {
            req.logger?.debug('Access token is valid');
            return next();
        }
    }
    req.logger?.warn('Invalid access token');
    res.status(401).send();
}
