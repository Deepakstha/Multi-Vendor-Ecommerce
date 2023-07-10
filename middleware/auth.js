const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.isAuthinticated = catchAsyncError(async (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		return res.status(401).json({
			message: "please Login First",
		});
	}
	const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
	req.user = await User.findById(decode.id);
	next();
});
