import { Router } from 'express';
import buildAppService from '../factories/app-service';
import { NewAppParameters } from '../types/new-app-parameters';

const router = Router();
const authService = buildAppService();

router.post('/', async (req: { body: NewAppParameters}, res) => {
    const app = await authService.addApp(req.body);
    res.status(200).send(app);
});

export default router;
