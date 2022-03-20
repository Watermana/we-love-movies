const router = require("express").Router({mergeParams: true});
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reviews.controller");

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router
    .route("/:reviewId")
    .get(controller.read)
    .put(controller.update)
    .patch(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

module.exports = router;