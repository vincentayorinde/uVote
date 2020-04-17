import express from 'express';
import users from './users';
import voters from './voters';
import parties from './parties';

const router = express.Router();

router.use('/users', users);
router.use('/voters', voters);
router.use('/parties', parties);

export default router;
