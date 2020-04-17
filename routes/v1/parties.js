import express from 'express';
import Validation from '../../validators/parties';
import Middleware from '../../middleware';
import Party from '../../controllers/parties';

const router = express.Router();

router.post('/add', Middleware.authenticate, Middleware.isAdmin, Validation.addParty, Party.addParty);

export default router;
