const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(12);
	const hashedPassword = await bcrypt.hash(password.toLowerCase(), salt);
	return hashedPassword;
};

exports.generateRandomString = (length) => {
	return [...Array(length)].map((_) => Math.floor(Math.random() * 36).toString(36)).join('');
};

exports.setAccessToken = (res, id) => {
	const token = jwt.sign({ _id: id }, process.env.JWT_SECRET);

	res.cookie('accessToken', token, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 });
};

exports.customError = (res, statusCode, message) => {
	return res.status(statusCode).json({
		message,
		statusCode,
		success: false
	});

	/*const error = new Error();
	error.statusCode = statusCode;
	error.message = message;

	return error;*/
};
