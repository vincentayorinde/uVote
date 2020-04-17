import express from 'express';
import users from './users';
import voters from './voters';
import parties from './parties';
import candidates from './candidates';

const router = express.Router();

router.use('/users', users);
router.use('/voters', voters);
router.use('/parties', parties);
router.use('/candidates', candidates);

export default router;
