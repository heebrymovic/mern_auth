const express = require('express');

const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const { connectDB, app } = require('./connectDB');

const UserRoutes = require('./routes/UserRoutes');
const AuthRoutes = require('./routes/AuthRoutes');
const verifyToken = require('./middleware/verifyToken');

dotenv.config();

app.use(express.json());

app.use(cookieParser());

connectDB();

app.use('/api/auth', AuthRoutes);
app.use('/api/user', verifyToken, UserRoutes);

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;

	const message = err.message || 'Internal Server Error';

	return res.status(statusCode).json({
		message,
		statusCode,
		success: false
	});
});
