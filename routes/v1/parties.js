import express from 'express';
import Validation from '../../validators/parties';
import Middleware from '../../middleware';
import Party from '../../controllers/parties';

const router = express.Router();

router.post(
    '/add',
    Middleware.authenticate,
    Middleware.isAdmin,
    Validation.addParty,
    Party.addParty
);
router.get('/', Middleware.authenticate, Middleware.isAdmin, Party.getParties);
router.get('/:id', Middleware.authenticate, Middleware.isAdmin, Party.getParty);
router.put(
    '/:id',
    Middleware.authenticate,
    Middleware.isAdmin,
    Validation.addParty,
    Party.updateParty
);
router.delete(
    '/:id',
    Middleware.authenticate,
    Middleware.isAdmin,
    Party.deleteParty
);

export default router;
