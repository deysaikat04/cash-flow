require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const transaction = require("./routes/transaction");
const user = require("./routes/userRoute");
const path = require("path");
const expressSanitizer = require("express-sanitizer");
const rateLimit = require("express-rate-limit");

var bodyParser = require("body-parser");
var cors = require("cors");

const {
  AUTH_RATE_LIMIT_MINS,
  AUTH_RATE_LIMIT_REQ,
  DEFAULT_RATE_LIMIT_MINS,
  DEFAULT_RATE_LIMIT_REQ,
} = process.env;

app.use(cors());

app.use(bodyParser.json());
app.use(expressSanitizer());

connectDB();

app.use(express.static("client/build"));

const authLimiter = rateLimit({
  windowMs: AUTH_RATE_LIMIT_MINS * 60 * 1000,
  max: AUTH_RATE_LIMIT_REQ, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many requests from this IP, please try again after a few  mins",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const defaultLimiter = rateLimit({
  windowMs: DEFAULT_RATE_LIMIT_MINS * 60 * 1000,
  max: DEFAULT_RATE_LIMIT_REQ, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many requests from this IP, please try again after a few  mins",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.get("/favicon.ico", (req, res) => res.status(204));

app.use("/api/transactions", defaultLimiter,  transaction);
app.use("/api/auth", authLimiter, user);

// app.use('*', (req, res) => {
//     res.status(404).json({ error: { message: 'Invalid route!' } });
// })

//Serve static assets in production
app.use(function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
