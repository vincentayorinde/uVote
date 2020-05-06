import express from 'express';
import Validation from '../../validators/candidates';
import Middleware from '../../middleware';
import Candidate from '../../controllers/candidates';

const router = express.Router();

router.post(
    '/add',
    Middleware.authenticate,
    Middleware.isExpiredToken,
    Middleware.isAdmin,
    Validation.addCandidate,
    Candidate.addCandidate
);
router.get('/', Candidate.getCandidates);
router.get(
    '/:id',
    Middleware.authenticate,
    Middleware.isExpiredToken,
    Middleware.isAdmin,
    Candidate.getCandidate
);
router.put(
    '/:id',
    Middleware.authenticate,
    Middleware.isExpiredToken,
    Middleware.isAdmin,
    Validation.addCandidate,
    Candidate.updateCandidate
);
router.delete(
    '/:id',
    Middleware.authenticate,
    Middleware.isExpiredToken,
    Middleware.isAdmin,
    Candidate.deleteCandidate
);

export default router;
