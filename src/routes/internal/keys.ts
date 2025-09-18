import { Request, Router } from 'express';
import buildKeyService from '../../factories/key-service';

const router = Router();
const keyService = buildKeyService();

router.post('/rotate', async (req: Request, res) => {
    if (req.user?.permissions.includes('internal')) {
        await keyService.rotateKeys();
        res.status(200).json({})
    } else
        res.status(403).send();
})

export default router;