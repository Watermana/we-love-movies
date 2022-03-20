const { where } = require("../db/connection");
const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties");

const addCritic = mapProperties({
   preferred_name: "critic.preferred_name",
   surname: "critic.surname",
   organization_name: "critic.organization_name",
   created_at: "critic.created_at",
   updated_at: "critic.updated_at",
});

const reduceCritic = reduceProperties("review_id",{
    critic_created_at: ["critic", "created_at"],
    critic_updated_at: ["critic", "updated_at"],
    preferred_name: ["critic", "preferred_name"],
    surname: ["critic", "surname"],
    organization_name: ["critic", "organization_name"],
    critic_critic_id: ["critic", "critic_id"]
  
  })


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
    .select("*", "c.created_at as critic_created_at", "c.updated_at as critic_updated_at", "c.critic_id as critic_critic_id")
    .where({"r.movie_id": movieId})
    .then(reduceCritic);
}

function listShowingMovies() {
    return knex("movies as m")
        .distinct()
        .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
        .select("m.*")
        .where({"mt.is_showing": true});
}

module.exports = {
    list,
    read,
    listTheaters,
    listReviews,
    listShowingMovies,
}