import path from 'node:path';
import { Router } from 'express';
import config from '../config/app';

const router  = Router();

router.get('/openid-configuration', (req, res) => {
    res.json({
        issuer: `http://${config.host}`,
        jwks_uri: `http://${config.host}/.well-known/jwk.json`,
    })
})

router.get('/jwk.json', async (req, res) => {
    // the file is one directory up
    const dirs = __dirname.split('/')
    dirs.pop()
    const dirname = dirs.join('/')
    const filePath = path.join(dirname, 'jwk.json');
    res.sendFile(filePath, (err: Error) => {
        if (err) {
            console.error('Error sending jwk.json', err);
            res.status(500).send();
        }
    })
})

export default router;
