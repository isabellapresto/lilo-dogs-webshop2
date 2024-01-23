const express = require('express');
const { registerUser, loginUser, logoutUser } = require('./user.controller');
const { getCurrentUser, logoutUser } = require('./user.controller');
const { authenticateUser } = require('./auth.middleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/current', getCurrentUser);
router.post('/logout', logoutUser); 

module.exports = router;
