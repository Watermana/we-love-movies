const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduceCritic = reduceProperties("review_id",{
    critic_created_at: ["critic", "created_at"],
    critic_updated_at: ["critic", "updated_at"],
    preferred_name: ["critic", "preferred_name"],
    surname: ["critic", "surname"],
    organization_name: ["critic", "organization_name"],
    critic_critic_id: ["critic", "critic_id"]
  
  })

//lists all movies from the movies table
function list() {
  return knex("movies");
}

// returns a specific movie based on id
function read(movieId) {
    return knex("movies")
        .select("*")
        .where({"movie_id": movieId})
        .first();
}

// returns a list of theaters that are showing a specific movie based on id
function listTheaters(movieId) {
    return knex("movies_theaters as mt")
        .join("theaters as t", "mt.theater_id", "t.theater_id")
        .select("mt.*", "t.*")
        .where({"mt.movie_id": movieId, "mt.is_showing": true});
}

// lists all reviews for a specific movie based on id.
//critic that wrote the review is also nested in the review object
function listReviews(movieId) {
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*", "c.created_at as critic_created_at", "c.updated_at as critic_updated_at", "c.critic_id as critic_critic_id")
    .where({"r.movie_id": movieId})
    .then(reduceCritic);
}

//lists all movies that are currently showing in any theater
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