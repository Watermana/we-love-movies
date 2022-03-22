const req = require("express/lib/request");
const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//middlewares

//checks to see if the given review exists based on id.
// if it does, set the review object to the res.locals.review 
// variable. if not send 404 error to client
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

//updates a given review based on review_id and data object from the request body
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

//returns a specific review object based on id
async function read(req, res, next) {
    res.json({data: res.locals.review});
}

//deletes a specific review based on id then sends status 204 to client
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