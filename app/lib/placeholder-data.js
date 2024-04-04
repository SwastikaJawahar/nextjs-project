// Import the fetchMovies function from fetchdata.js
const fetchMovies = require("./fetchdata.js");

// Placeholder movies array
let movies = [];

// Function to fetch movie data
async function updateMovies() {
  try {
    const fetchedMovies = await fetchMovies();
    movies = fetchedMovies;
    //console.log("place movies", movies);
    return fetchedMovies;
  } catch (error) {
    console.error("Error getting movies:", error);
    throw error;
  }
}
module.exports = {
  updateMovies,
  get movies() {
    return movies;
    //console.log("export", movies);
  },
};

updateMovies()
  .then((fetchedMovies) => {
    //console.log("export", movies);
    console.log("Movies fetched successfully.");
  })
  .catch((error) => {
    console.error("Error fetching movies:", error);
  });
