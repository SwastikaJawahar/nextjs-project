const { db } = require("@vercel/postgres");
const { movies } = require("../app/lib/placeholder-data.js");

async function seedMovies(client) {
  try {
    await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    // Create the "movies" table if it doesn't exist
    const createTable = await client.query(`
      CREATE TABLE IF NOT EXISTS movies (
        id SERIAL PRIMARY KEY,
        adult BOOLEAN NOT NULL,
        backdrop_path VARCHAR(255),
        genre_ids INTEGER[],
        original_language VARCHAR(10),
        original_title VARCHAR(255) NOT NULL,
        overview TEXT,
        popularity NUMERIC,
        poster_path VARCHAR(255),
        release_date DATE,
        title VARCHAR(255) NOT NULL,
        video BOOLEAN,
        vote_average NUMERIC,
        vote_count INTEGER
      )
    `);
    console.log(`Created "movies" table`);

    // Insert data into the "movies" table
    const insertedMovies = await Promise.all(
      movies.map(async (movie) => {
        return client.query(
          `
          INSERT INTO movies (id, adult, backdrop_path, genre_ids, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
          ON CONFLICT (id) DO NOTHING;
        `,
          [
            movie.id,
            movie.adult,
            movie.backdrop_path,
            movie.genre_ids,
            movie.original_language,
            movie.original_title,
            movie.overview,
            movie.popularity,
            movie.poster_path,
            movie.release_date,
            movie.title,
            movie.video,
            movie.vote_average,
            movie.vote_count,
          ]
        );
      })
    );

    console.log(`Seeded ${insertedMovies.length} movies`);

    return {
      createTable,
      movies: insertedMovies,
    };
  } catch (error) {
    console.error("Error seeding movies:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedMovies(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
