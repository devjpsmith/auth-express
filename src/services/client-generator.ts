import { ulid } from 'ulid';
import * as crypto  from 'crypto';
import base64url from 'base64url';

export default class ClientGenerator {
    getNewClient(): { clientId: string; clientSecret: string; } {
        const clientId = ulid();
        const secret = crypto.randomBytes(52).toString('hex');
        const clientSecret = base64url(secret);
        return { clientId, clientSecret };
    }
}