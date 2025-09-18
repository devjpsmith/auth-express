import { Router } from 'express';
import buildAuthService from '../factories/app-service';
import tokenGenerator from '../services/token-generator';

const router = Router();
const authService = buildAuthService();

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
        const { permissions, name: sub } = app;
        const accessToken = await tokenGenerator({
            permissions,
            sub
        }, app.token_lifetime_seconds);
        // const accessToken = jwt.sign({
        //     permissions: permissions,
        // }, privateKey, { ...config, expiresIn: app.token_lifetime_seconds});
        res.json({ access_token: accessToken, expires_in: app.token_lifetime_seconds, token_type: 'Bearer', scope });
    } catch (e: unknown) {
        // @ts-expect-error handling exception
        res.status(500).send(e.message);
    }
})

export default router;
