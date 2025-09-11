import { Router } from 'express';
import config from '../config/app';
import { getFileInParentDirectory } from '../lib/utils';

const router  = Router();

router.get('/openid-configuration', (req, res) => {
    res.json({
        issuer: `http://${config.host}`,
        jwks_uri: `http://${config.host}/.well-known/jwk.json`,
    })
})

router.get('/jwk.json', async (req, res) => {
    const filePath = getFileInParentDirectory(__dirname, 'jwk.json');
    res.sendFile(filePath, (err: Error) => {
        if (err) {
            console.error('Error sending jwk.json', err);
            res.status(500).send();
        }
    })
})

export default router;
