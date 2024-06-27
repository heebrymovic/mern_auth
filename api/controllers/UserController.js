const { customError, hashPassword } = require('../utils');
const User = require('../models/User');

exports.updateUser = async (req, res, next) => {
	const userId = req.params.userId;

	const { password, profilePicture, username } = req.body;

	if (userId !== req.userId) return customError(res, 403, 'You can only update your own account');

	try {
		if (password) {
			req.body.password = await hashPassword(password);
		}

		const checkUser = await User.findOne({ username });

		if (checkUser) return customError(res, 403, 'Username already exist');

		const updateUser = await User.findByIdAndUpdate(
			userId,
			{
				$set: {
					username,
					profilePicture,
					password: req.body.password
				}
			},
			{ new: true }
		);

		const { password: newPassword, ...user } = updateUser._doc;

		return res.status(200).json({
			message: 'User Profile updated Successfully',
			user
		});
	} catch (err) {
		next(err);
	}
};

exports.deleteUser = async (req, res, next) => {
	const userId = req.params.userId;

	if (req.userId !== userId) return customError(res, 403, 'You can only delete your own account');

	try {
		const deleteUser = await User.findByIdAndDelete(userId);

		res.status(200).json({ message: 'User account Deleted Successfully' });
	} catch (err) {
		next(err);
	}
};
