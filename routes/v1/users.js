const express = require('express');
const User = require('../../controllers/users');
const Validation = require('../../validators/users');

const router = express.Router();

router.post('/signup', Validation.signUp, User.signUp);

module.exports = router;
