if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");

const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

const app = express();

// enable cors for the entire app
app.use(cors());


//routes
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

// Not found handler
app.use((req, res, next) => {
    next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

// Error handler
app.use((error, req, res, next) => {
    console.error(error);
    const { status = 500, message = "Something went wrong!" } = error;
    res.status(status).json({ error: message });
});

module.exports = app;
