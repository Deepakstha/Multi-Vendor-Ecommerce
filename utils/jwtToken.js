// create token and saving  that in cookies
const jwt = require("jsonwebtoken");
require("dotenv").config();

const sendToken = (user, statusCode, res) => {
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRES,
	});
	console.log(user, "from jwt");
	console.log(token, "from jwt");

	const options = {
		expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 100),
		httpOnly: true,
	};
	res.cookie("token", token, options).json({
		success: true,
		token,
	});
};

module.exports = sendToken;
