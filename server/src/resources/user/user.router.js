const express = require('express');
const { registerUser, loginUser, logoutUser,getCurrentUser } = require('./user.controller');

const { authenticateUser } = require('./auth.middleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/current', getCurrentUser);
router.post('/logout', logoutUser); 

module.exports = router;
