import { Router } from 'express';
import register from './register';
import oauth from './oauth';
import wellKnown from './well-known'
import internal from './internal';

const router = Router();

router.use('/.internal', internal);

router.use('/register', register);
router.use('/oauth', oauth);
router.use('/.well-known', wellKnown)

export default router;
