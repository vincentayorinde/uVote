import express from 'express';
import Validation from '../../validators/vote';
import Middleware from '../../middleware';
import Vote from '../../controllers/vote';

const router = express.Router();

router.post('/', Validation.addVote, Vote.addVote);
router.post('/check-voter', Validation.checkVoter, Vote.checkVoter);
router.get(
    '/result',
    Middleware.authenticate,
    Middleware.isExpiredToken,
    Middleware.isAdmin,
    Vote.getResult
);

export default router;
