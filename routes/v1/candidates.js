import express from 'express';
import Validation from '../../validators/candidates';
import Middleware from '../../middleware';
import Camdidate from '../../controllers/candidates';

const router = express.Router();

router.post('/add', Middleware.authenticate, Middleware.isAdmin, Validation.addCandidate, Camdidate.addCandidate);

export default router;
