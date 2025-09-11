import { Router } from 'express';
import register from './register';
import oauth from './oauth';
import wellKnown from './well-known'

const router = Router();

router.use('/register', register);
router.use('/oauth', oauth);
router.use('/.well-known', wellKnown)

export default router;
