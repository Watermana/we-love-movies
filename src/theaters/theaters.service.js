const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduceMovies = reduceProperties("theater_id", {
    theater_id: ["theater_id"],
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    is_showing: ["movies", null, "is_showing"],
    movie_theater_id: ["movies", null, "theater_id"],
    movie_created_at: ["movies", null, "created_at"],
    movie_updated_at: ["movies", null, "updated_at"],
})

//queries the theaters table, then join movies and reduces them into an array of movie objects within
// each theater object
function read() {
    return knex("theaters as t")
        .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .select("*")
        .then(reduceMovies);
}

module.exports = {
    read,
}