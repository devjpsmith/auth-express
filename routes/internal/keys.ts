import { Router } from 'express';
import buildKeyService from '../../factories/key-service';

const router = Router();
const keyService = buildKeyService();

router.post('/rotate', async (req, res) => {
    await keyService.rotateKeys();
    res.status(200).json({})
})

export default router;