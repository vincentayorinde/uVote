import express from 'express';
import User from '../../controllers/users';
import Validation from '../../validators/users';
import Middleware from '../../middleware';

const router = express.Router();

router.post('/signup', Validation.signUp, User.signUp);
router.post('/signin', Validation.signIn, User.signIn);
router.post('/signout', Middleware.authenticate, Middleware.isExpiredToken, User.signOut);

export default router;
