import crypto from 'crypto';
import config from '../config/auth';
import { base64UrlEncode, urlEncode } from '../lib/utils';
import buildKeyService from '../factories/key-service';

const keyService = buildKeyService();

export default async function (data: object, exp: number): Promise<string> {
    // the file is one directory up
    const key = await keyService.getCurrentKey();

    const header = {
        kid: key.key_id,
        alg: config.algorithm,
        typ: 'JWT'
    };
    const now = Math.floor(Date.now() / 1000);
    const payload = {
        ...data,
        iss: config.issuer,
        iat: now,
        exp: now + exp,
    }
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));
    const encodedHeader = base64UrlEncode(JSON.stringify(header));

    const signingContent = `${encodedHeader}.${encodedPayload}`;

    const signature = crypto
        .createSign('RSA-SHA256')
        .update(signingContent)
        .sign(key.private_key, 'base64');
    const encodedSig = urlEncode(signature);

    return `${encodedHeader}.${encodedPayload}.${encodedSig}`;
}
