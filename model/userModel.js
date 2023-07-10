const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	fullname: {
		type: String,
		required: [true, "Please enter your name!"],
	},
	email: {
		type: String,
		required: [true, "Please enter your email!"],
	},
	password: {
		type: String,
		required: [true, "Please enter your password"],
		minLength: [4, "Password should be greater than 4 characters"],
		select: false,
	},
	phoneNumber: {
		type: Number,
	},

	role: {
		type: String,
		default: "user",
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	resetPasswordToken: String,
	resetPasswordTime: Date,
});

module.exports = mongoose.model("User", userSchema);
