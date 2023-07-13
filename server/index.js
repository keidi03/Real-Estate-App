const express = require("express");
const app = express();
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const propertyRoute = require("./routes/property");
const cors = require("cors");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
dotenv.config();
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");

app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
//Api Routes
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.options(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);
app.use("/api/test", (req, res) => {
  const jwtToken = req.cookies.jwt;
  res.send(`Received cookie: ${jwtToken}`);
});

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/property", propertyRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
