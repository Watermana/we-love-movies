const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");


const addCritic = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    c_created_at: "critic.created_at",
    c_updated_at: "critic.updated_at",
  });

// returns first row in reviews table where review_id matches 
// the id passed into the function
async function read(review_id) {
    return knex("reviews")
        .select("*")
        .where({review_id})
        .first();
}

//returns all rows in the reviews table
async function list() {
    return knex("reviews");
}

// finds the correct row from reviews, then updates it with whatever
// new data was passed in as updatedReview
async function update(updatedReview) {
    return knex("reviews")
        .where({review_id: updatedReview.review_id})
        .update(updatedReview, "*");
}

// returns a specific review object with the critic nested inside
async function listReviewWithCritic(review_id) {
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*", "c.created_at as c_created_at", "c.updated_at as c_updated_at")
    .where({"r.review_id": review_id})
    .first()
    .then(addCritic);
}

// deletes a given row from reviews based on id
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