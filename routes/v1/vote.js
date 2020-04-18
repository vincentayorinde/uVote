import express from 'express';
import Validation from '../../validators/vote';
import Vote from '../../controllers/vote';

const router = express.Router();

router.post('/', Validation.addVote, Vote.addVote);

export default router;
