import express from 'express';
import User from '../../controllers/users';
import Validation from '../../validators/users';

const router = express.Router();

router.post('/signup', Validation.signUp, User.signUp);
router.post('/signin', Validation.signIn, User.signIn);

export default router;
