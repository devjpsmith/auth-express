import express from 'express';
import keys from './keys';

const router = express.Router()

// TODO: protect these endpoints with authorization middleware

router.use('/keys', keys )

export default router;
