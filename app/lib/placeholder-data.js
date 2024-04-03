// Import the fetchMovies function from fetchdata.js
const fetchMovies = require("./fetchdata.js");

// Placeholder movies array
let movies = [];

// Function to fetch movie data
async function updateMovies() {
  try {
    // Call fetchMovies function to get the movie data
    const fetchedMovies = await fetchMovies();

    // Update the movies array with the fetched movies
    movies = fetchedMovies;
    //console.log("place movies", movies);
    // Return the fetched movies
    return fetchedMovies;
  } catch (error) {
    console.error("Error getting movies:", error);
    throw error;
  }
}

// Export function to get movies and update the movies array
module.exports = {
  updateMovies,
  get movies() {
    return movies;
    //console.log("export", movies);
  },
};

// Call the updateMovies function to fetch movies and update the movies array
updateMovies()
  .then((fetchedMovies) => {
    //console.log("export", movies);
    console.log("Movies fetched successfully.");
  })
  .catch((error) => {
    console.error("Error fetching movies:", error);
  });
