const mongoose = require('mongoose');

const express = require('express');

const app = express();

const port = 8005;

const connectDB = async () => {
	await mongoose.connect(process.env.local_mongoose_url);

	console.log('Database connect successfully');

	const server = app.listen(port, () => {
		console.log(`Server is running on port ${port}`);
	});

	process.on('unhandledRejection', (err) => {
		console.log(`An error occurred: ${err.message}`);
		server.close(() => process.exit(1));
	});
};

module.exports = { connectDB, app };
