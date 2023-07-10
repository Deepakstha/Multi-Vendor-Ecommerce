const express = require("express");
const app = express();
require("dotenv").config();
const ErrorHandler = require("./utils/ErrorHandler");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static("uploads"));

//import routes
const user = require("./controller/userController");
app.use("/api/v2/user", user);

//Error Handler
app.use(ErrorHandler);

module.exports = app;
