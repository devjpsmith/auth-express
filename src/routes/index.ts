import { Router } from 'express';
import register from './register';
import oauth from './oauth';
import wellKnown from './well-known'
import internal from './internal';
import requestLogger from 'middleware/request-logger';

const router = Router();

router.use(requestLogger);

router.use('/.internal', internal);

router.use('/register', register);
router.use('/oauth', oauth);
router.use('/.well-known', wellKnown)

export default router;
