import express from 'express';
import keys from './keys';
import authenticationMiddleware from '../../middleware/token-authentication';
import permissionMiddleware, { authorize } from '../../middleware/permissions';

const router = express.Router()

// TODO: protect these endpoints with authorization middleware
router.use(authenticationMiddleware);
router.use(permissionMiddleware)
router.use('/keys', authorize(['internal']), keys )

export default router;
