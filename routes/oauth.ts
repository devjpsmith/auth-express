import { Router } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'node:fs';
import buildAuthService from '../factories/auth-service';
import config from '../config/auth';

const router = Router();
const authService = buildAuthService();
const privateKey = fs.readFileSync('private.key');

router.post('/token', async (req, res) => {
    const { client_id, client_secret, grant_type, scope } = req.body;

    try {
        const app = await authService.getApp(client_id, client_secret);
        // no app with this client_id and client_secret found!
        if (!app) {
            res.status(401).send('no app');
            return;
        }

        // the request contains a grant type not associated with this app
        if (!app.grant_types.find(x => x === grant_type)) {
            res.status(401).send('Invalid grant_type');
            return
        }

        // request is good; issue a token
        const { permissions } = app;
        const accessToken = jwt.sign({
            permissions: permissions,
        }, privateKey, { ...config, expiresIn: app.token_lifetime_seconds});
        res.json({ access_token: accessToken, expires_in: app.token_lifetime_seconds, token_type: 'Bearer', scope });
    } catch (e: unknown) {
        // @ts-expect-error handling exception
        res.status(500).send(e.message);
    }
})

export default router;
