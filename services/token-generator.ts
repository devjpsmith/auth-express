import fs from 'node:fs';
import crypto from 'crypto';
import config from '../config/auth';
import { base64UrlEncode, getFileInParentDirectory, urlEncode } from '../lib/utils';


export default function (data: object, exp): string {
    const header = {
        kid: config.keyid,
        alg: config.algorithm,
        typ: 'JWT'
    };
    const now = Math.floor(Date.now() / 1000)
    const payload = {
        ...data,
        iss: config.issuer,
        iat: now,
        exp: now + exp,
    }
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));
    const encodedHeader = base64UrlEncode(JSON.stringify(header));

    const signingContent = `${encodedHeader}.${encodedPayload}`;

    // the file is one directory up
    const fileName = getFileInParentDirectory(__dirname, 'private.key');
    const privateKey = fs.readFileSync(fileName, 'utf8');

    const signature = crypto
        .createSign('RSA-SHA256')
        .update(signingContent)
        .sign(privateKey, 'base64');
    const encodedSig = urlEncode(signature);

    return `${encodedHeader}.${encodedPayload}.${encodedSig}`;
}
