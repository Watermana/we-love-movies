const req = require("express/lib/request");
const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//middlewares

async function reviewExists(req, res, next) {
    const review = await reviewsService.read(req.params.reviewId);
    if(review) {
        res.locals.review = review;
        return next();
    }
    next({status: 404, message:"Review cannot be found."});
}


//handlers

async function list(req, res, next) {
    res.json({data: await reviewsService.list()});
}

async function update(req, res, next) {
    const {review_id} = res.locals.review;
    const updatedReview = {
        ...req.body.data,
        review_id,
    };
    await reviewsService.update(updatedReview);
    const data = await reviewsService.listReviewWithCritic(review_id)
    res.json({ data })
}

async function read(req, res, next) {
    res.json({data: res.locals.review});
}

async function destroy(req, res, next) {
    await reviewsService.destroy(res.locals.review.review_id);
    res.sendStatus(204);
}

module.exports = {
    list: asyncErrorBoundary(list),
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    read: [asyncErrorBoundary(reviewExists), read],
    delete: [asyncErrorBoundary(reviewExists), destroy],
}