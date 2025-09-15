import { generateKeyPairSync, createPublicKey } from 'crypto';
import { Key as tKey } from '../types/key';
import { ulid } from 'ulid';

type Key = Omit<tKey, 'id'>;

export default function generateKey(): Key {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        }
    });

    const key_id = ulid();

    const key = createPublicKey(publicKey);
    const publicKeyJwk = key.export({ format: 'jwk' });
    publicKeyJwk.use = 'sig';
    publicKeyJwk.kid = key_id;

    return {
        key_id,
        public_key: publicKey.toString(),
        private_key: privateKey.toString(),
        jwk_json: JSON.stringify(publicKeyJwk, null, 2),
    };
}