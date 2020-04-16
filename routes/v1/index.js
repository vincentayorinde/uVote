import express from 'express';
import users from './users';
import voters from './voters';

const router = express.Router();

router.use('/users', users);
router.use('/voters', voters);

export default router;
