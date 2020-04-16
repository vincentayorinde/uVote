import express from 'express';
import Validation from '../../validators/voters';
import Middleware from '../../middleware';
import Voter from '../../controllers/voters';

const router = express.Router();

router.post('/add', Middleware.authenticate, Middleware.isAdmin, Validation.addVoter, Voter.addVoter);

export default router;
