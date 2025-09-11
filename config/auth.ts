import { Algorithm } from 'jsonwebtoken';

export default {
    algorithm: 'RS256' as Algorithm,
    issuer: 'http://localhost:3000',
    keyid: process.env.KEY_ID
}
