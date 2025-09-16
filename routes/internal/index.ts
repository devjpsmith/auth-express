import express from 'express';
import keys from './keys';
import authenticationMiddleware from '../../middleware/token-authentication';

const router = express.Router()

// TODO: protect these endpoints with authorization middleware
router.use(authenticationMiddleware);
router.use('/keys', keys )

export default router;
