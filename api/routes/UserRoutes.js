const express = require('express');

const UserRouter = express.Router();

const { updateUser, deleteUser } = require('../controllers/UserController');

UserRouter.put('/update/:userId', updateUser);
UserRouter.get('/delete/:userId', deleteUser);

module.exports = UserRouter;
