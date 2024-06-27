const jwt = require('jsonwebtoken');
const { customError } = require('../utils');

const verifyToken = async (req, res, next) => {
	const token = req.cookies.accessToken;

	if (!token) return customError(res, 401, 'You not authorized. You need to login');

	try {
		const decodedUser = await jwt.verify(token, process.env.JWT_SECRET);

		if (!decodedUser) {
			return customError(res, 400, 'Cannot Verify Authentication');
		}
		req.userId = decodedUser._id;

		next();
	} catch (err) {
		customError(res, 500, err.message);
	}
};

module.exports = verifyToken;
