const req = require("express/lib/request");
const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


//checks if the movie exists based on id. if it does,
// set movie to res.locals.movie varaible if not return 404
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

//lists all movies. if the ?is_showing=true query is in the url,
// then only list movies that are currently showing
async function list(req, res, next) {
    console.log(req.query.is_showing);
    if(req.query.is_showing) {
        const data = await moviesService.listShowingMovies();
        return res.json({data});
    }
    const data = await moviesService.list();
    res.json({data});
}

//send specific movie object to client
async function read(req, res) {
    const movie = res.locals.movie;
    res.json({data: movie});
}

// sends to client a list of all theaters showing a specific movie based on id
async function listTheaters(req, res, next) {
    console.log(req.params.movieId)
    const data = await moviesService.listTheaters(req.params.movieId);
    res.json({ data });
}

// sends to client a list of all reviews for a specific movie based on id
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