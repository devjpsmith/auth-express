import express from 'express';
import keys from './keys';

const router = express.Router()

router.use('/keys', keys )

export default router;
