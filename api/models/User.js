const Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		profilePicture: {
			type: String,
			default: ''
		}
	},
	{ timestamps: true }
);

const User = Mongoose.model('User', UserSchema);

module.exports = User;
