import { Router } from 'express';
import config from '../config/app';
import buildKeyService from '../factories/key-service';

const router  = Router();
const keyService = buildKeyService();

router.get('/openid-configuration', (req, res) => {
    res.json({
        issuer: `http://${config.host}`,
        jwks_uri: `http://${config.host}/.well-known/jwk.json`,
    })
})

router.get('/jwk.json', async (req, res) => {
    const currentKeys = await keyService.getKeys();
    const keys = currentKeys.map(k => JSON.parse(k.jwk_json));
    res.json({keys});
})

export default router;
