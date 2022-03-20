const req = require("express/lib/request");
const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
    res.json({message: "test"});
}

module.exports = {
    list,
}