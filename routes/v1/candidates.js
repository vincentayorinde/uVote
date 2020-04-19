import express from 'express';
import Validation from '../../validators/candidates';
import Middleware from '../../middleware';
import Candidate from '../../controllers/candidates';

const router = express.Router();

router.post(
    '/add',
    Middleware.authenticate,
    Middleware.isAdmin,
    Validation.addCandidate,
    Candidate.addCandidate
);
router.get(
    '/',
    Middleware.authenticate,
    Middleware.isAdmin,
    Candidate.getCandidates
);
router.get(
    '/:id',
    Middleware.authenticate,
    Middleware.isAdmin,
    Candidate.getCandidate
);
router.put(
    '/:id',
    Middleware.authenticate,
    Middleware.isAdmin,
    Validation.addCandidate,
    Candidate.updateCandidate
);
router.delete(
    '/:id',
    Middleware.authenticate,
    Middleware.isAdmin,
    Candidate.deleteCandidate
);

export default router;
