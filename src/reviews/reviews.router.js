const router = require("express").Router();
const controller = require("./reviews.controller");

router
    .route("/")
    .get(controller.list)

module.exports = router;