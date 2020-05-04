import express from 'express';
import Validation from '../../validators/voters';
import Middleware from '../../middleware';
import Voter from '../../controllers/voters';

const router = express.Router();

router.post(
    '/add',
    Middleware.authenticate,
    Middleware.isExpiredToken,
    Middleware.isAdmin,
    Validation.addVoter,
    Voter.addVoter
);
router.get('/', Middleware.authenticate,  Middleware.isExpiredToken, Middleware.isAdmin, Voter.getVoters);
router.get('/:id', Middleware.authenticate,  Middleware.isExpiredToken, Middleware.isAdmin, Voter.getVoter);
router.put(
    '/:id',
    Middleware.authenticate,
    Middleware.isExpiredToken,
    Middleware.isAdmin,
    Validation.addVoter,
    Voter.updateVoter
);
router.delete(
    '/:id',
    Middleware.authenticate,
    Middleware.isExpiredToken,
    Middleware.isAdmin,
    Voter.deleteVoter
);
export default router;
