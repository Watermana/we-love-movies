const { where } = require("../db/connection");
const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties");

const addCritic = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    c_created_at: "critic.created_at",
    c_updated_at: "critic.updated_at",
  });

async function read(review_id) {
    return knex("reviews")
        .select("*")
        .where({review_id})
        .first();
}

async function list() {
    return knex("reviews");
}

async function update(updatedReview) {
    return knex("reviews")
        .where({review_id: updatedReview.review_id})
        .update(updatedReview, "*");
}

async function listReviewWithCritic(review_id) {
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*", "c.created_at as c_created_at", "c.updated_at as c_updated_at")
    .where({"r.review_id": review_id})
    .first()
    .then(addCritic);
}

async function destroy(review_id) {
    return knex("reviews")
        .where({review_id})
        .del();
}

module.exports = {
    read,
    list,
    update,
    listReviewWithCritic,
    destroy
}