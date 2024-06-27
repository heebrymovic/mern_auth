const User = require('../models/User');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { customError, hashPassword, generateRandomString, setAccessToken } = require('../utils');

exports.register = async (req, res, next) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		return customError(res, 401, 'username, email and password required in the request body');
	}

	try {
		const checkUser = await User.findOne({
			$or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }]
		});

		if (checkUser) {
			const error = username === checkUser.username ? 'Username already Exist' : 'Email already exist';
			return customError(res, 403, error);
		}

		const hashedPassword = await hashPassword(password);

		const newUser = await new User({
			username: username.toLowerCase(),
			email: email.toLowerCase(),
			password: hashedPassword
		});

		await newUser.save();

		res.status(200).json({
			message: 'User created Successfully'
		});
	} catch (err) {
		next(err);
	}
};

exports.googleAuth = async (req, res, next) => {
	const { username, email, profilePicture } = req.body;

	if (!username || !email) {
		return customError(res, 401, 'username and email required in the request body');
	}

	try {
		const validUser = await User.findOne({ email: email.toLowerCase() });

		if (validUser) {
			setAccessToken(res, validUser._id);

			const { password: userPassword, ...user } = validUser._doc;

			return res.status(200).json({
				message: 'Login Successful',
				user
			});
		} else {
			const randomPassword = generateRandomString(10);

			const hashedPassword = await hashPassword(randomPassword);

			const newUser = await new User({ username, email, password: hashedPassword, profilePicture });

			await newUser.save();

			setAccessToken(res, newUser._id);

			const { password: userPassword, ...user } = newUser._doc;

			return res.status(200).json({
				message: 'Registration Successful',
				user
			});
		}
	} catch (err) {
		next(err);
	}
};

exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return customError(res, 401, 'email and password required in the request body');
	}

	try {
		const validUser = await User.findOne({ email: email.toLowerCase() });

		if (!validUser) return customError(res, 401, 'User not found');

		const validPassword = await bcrypt.compare(password.toLowerCase(), validUser.password);

		if (!validPassword) return customError(res, 401, 'Invalid Credentials');

		setAccessToken(res, validUser._id);

		const { password: userPassword, ...user } = validUser._doc;

		return res.status(200).json({
			message: 'Login Successful',
			user
		});
	} catch (err) {
		next(err);
	}
};

exports.logout = (req, res, next) => {
	try {
		res.clearCookie('accessToken').status(200).json({ message: 'Logout Successful' });
	} catch (err) {
		next(err);
	}
};
