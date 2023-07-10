const express = require("express");
const path = require("path");
const User = require("../model/userModel");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const bcrypt = require("bcrypt");
const { isAuthinticated } = require("../middleware/auth");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
	const { fullname, email, password } = req.body;
	let userEmail;
	try {
		userEmail = await User.findOne({ email });
	} catch (error) {
		console.log(error);
	}
	if (userEmail) {
		const filename = req.file.filename;
		const filePath = `uploads/${filename}`;
		fs.unlink(filePath, (error) => {
			if (error) {
				console.log(error);
				res.status(500).json({ message: "Error deleting file" });
			} else {
				res.json({
					message: "File Deleted Successfully",
				});
				console.log("File Deleted");
			}
		});
		return next(new ErrorHandler("User Already Exist with this Email", 400));
	}

	const filename = req.file.filename;
	const fileUrl = path.join(filename);
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = {
		fullname,
		email,
		password: hashedPassword,
		avatar: fileUrl,
	};

	// const newUser = await User.create(user)
	const activationToken = createActivationToken(user).toString();
	const activationUrl = `http://localhost:5173/activation/${activationToken}`;
	try {
		await sendMail({
			email: user.email,
			subject: "Activate Your Account",
			message: `Hello ${user.fullname}, Please click on link to activate your account: ${activationUrl}`,
		});
		console.log("User xoinasss");
		return res.status(201).json({ message: "Please Check your email to very" });
	} catch (error) {
		return next(new ErrorHandler(error.message, 500));
	}
});

//create activation token
const createActivationToken = (user) => {
	return jwt.sign(user, process.env.ACTIVATION_SECRET, {
		expiresIn: "5m",
	});
};

// activate user
router.post(
	"/activation",
	catchAsyncError(async (req, res) => {
		try {
			const { activation_token } = req.body;

			if (!activation_token) {
				throw new Error("Invalid Token");
			}

			console.log(activation_token);
			const decode = jwt.decode(activation_token);
			console.log(decode, "decodddd");

			if ((new Date().getTime() + 1) / 1000 > decode.exp) {
				return res.json({
					message: "Token Expires",
				});
			}
			const newUser = jwt.verify(
				activation_token,
				process.env.ACTIVATION_SECRET
			);

			console.log(activation_token);
			console.log(newUser);

			if (!newUser) {
				return next(new ErrorHandler("Not Valid Token", 400));
			}
			const { fullname, email, password, avatar } = newUser;
			let userEmail;
			try {
				userEmail = await User.findOne({ email });
			} catch (error) {
				console.log(error);
			}
			if (userEmail) {
				return res.json({ message: "Already registered" });
			}
			const user = await User.create({ fullname, email, password, avatar });
			sendToken(user, 201, res);
		} catch (error) {
			console.log(error);
		}
	})
);

router.post(
	"/login",
	catchAsyncError(async (req, res, next) => {
		try {
			const { email, password } = req.body;
			console.log(req.body);
			let user;
			try {
				user = await User.findOne({ email }).select("+password");
			} catch (error) {
				console.log(error);
			}

			if (!user) {
				console.log("no user");
				return res.status(404).json({
					status: 404,
					message: "Invalid username or password",
				});
			}
			const passwordMatch = bcrypt.compareSync(password, user.password);
			console.log(passwordMatch, "Password Mathcchch");
			if (!passwordMatch) {
				return res.status(401).json({
					status: 401,
					message: "Invalid  password",
				});
			}
			console.log(user);
			sendToken(user, 201, res);
		} catch (error) {
			console.log(error);
		}
	})
);

router.get(
	"/getuser",
	isAuthinticated,
	catchAsyncError((req, res, next) => {
		try {
			const user = req.user;

			if (!user) {
				return res.status(401).json({ message: "Unauthorized person Entered" });
			}
			return res.status(200).json({ success: true, user });
		} catch (error) {
			console.log(error);
		}
	})
);

module.exports = router;
