/* eslint-disable  @typescript-eslint/no-require-imports */
const { generateKeyPairSync, createPublicKey } = require('crypto');
const { writeFileSync } = require('fs');

const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});

// create jwk
const key = createPublicKey(publicKey);
const publicKeyJwk = key.export({ format: 'jwk' });
publicKeyJwk.use = 'sig';
publicKeyJwk.kid = process.env.KEY_ID;
const jwt_json = JSON.stringify({ keys: [ publicKeyJwk ]}, null, 2);
writeFileSync('jwk.json', jwt_json);

writeFileSync('private.key', privateKey);
writeFileSync('public.key', publicKey);
