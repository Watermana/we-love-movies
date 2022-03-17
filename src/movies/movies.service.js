const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
   preferred_name: "critic.preferred_name",
   surname: "critic.surname",
   organization_name: "critic.organization_name",
   created_at: "critic.created_at",
   updated_at: "critic.updated_at",
});


function list() {
  return knex("movies").select("*");
}

function read(movieId) {
    return knex("movies")
        .select("*")
        .where({"movie_id": movieId})
        .first();
}

function listTheaters(movieId) {
    return knex("movies_theaters as mt")
        .join("theaters as t", "mt.theater_id", "t.theater_id")
        .select("mt.*", "t.*")
        .where({"mt.movie_id": movieId, "mt.is_showing": true});
}

function listReviews(movieId) {
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("r.*", "c.*")
        .where({"r.movie_id": movieId});
        //.then(addCritic);
}

module.exports = {
    list,
    read,
    listTheaters,
    listReviews,
}