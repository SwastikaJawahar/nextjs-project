const axios = require("axios");

// Function to fetch movie data
async function fetchMovies() {
  try {
    const url =
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
    const headers = {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjY5OGFkYWQ4NzYyZjYxZTI1OWU5ZDI4ZDI0NWFmYSIsInN1YiI6IjY2MGJkYTE0MTQ5NTY1MDE3ZGJiMTYwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M0u6nNOddgvZDONejLMGujk6_CdtDJ5URzwXYYimbMw",
    };

    // Make GET request to the API endpoint
    const response = await axios.get(url, { headers });

    // Extract movie data from the response
    const fetchedMovies = response.data.results;

    // Process or display the fetched movie data
    console.log("Fetched movies:", fetchedMovies);

    return fetchedMovies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}

module.exports = fetchMovies;
