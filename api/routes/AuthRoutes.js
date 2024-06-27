const express = require('express');

const AuthRouter = express.Router();

const { register, login, googleAuth, logout } = require('../controllers/AuthController');

AuthRouter.post('/register', register);
AuthRouter.post('/login', login);
AuthRouter.post('/google', googleAuth);
AuthRouter.get('/logout', logout);

module.exports = AuthRouter;
