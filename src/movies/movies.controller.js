const req = require("express/lib/request");
const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
    const movie = await moviesService.read(req.params.movieId);
    if(movie) {
        res.locals.movie = movie;
        return next();
    }
    return next({
        status: 404,
        message: "Movie cannot be found."
    });
}


async function list(req, res, next) {
    console.log(req.query.is_showing);
    if(req.query.is_showing) {
        const data = await moviesService.listShowingMovies();
        return res.json({data});
    }
    const data = await moviesService.list();
    res.json({data});
}

async function read(req, res) {
    const movie = res.locals.movie;
    res.json({data: movie});
}

async function listTheaters(req, res, next) {
    console.log(req.params.movieId)
    const data = await moviesService.listTheaters(req.params.movieId);
    res.json({ data });
}

async function listReviews(req, res, next) {
    console.log(req.params.movieId)
    const data = await moviesService.listReviews(req.params.movieId);
    res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    listTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheaters)],
    listReviews:  [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviews)],
};