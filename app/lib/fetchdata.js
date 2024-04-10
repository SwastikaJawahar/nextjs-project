import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { movies } from "./definitions";

export async function fetchMovies() {
  noStore();
  try {
    console.log("Fetching movies data...");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql`SELECT * FROM movies`;
    const formattedMovies = data.rows.map((movie) => ({
      ...movie,
      release_date: movie.release_date.toISOString(), // Convert release_date to string
    }));

    console.log("Data fetch completed after 3 seconds.");

    return formattedMovies;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch movies data.");
  }
}
const ITEMS_PER_PAGE1 = 10; // Adjust as needed
export async function fetchFilteredMovies(query, currentPage) {
  noStore();
  // const offset = (currentPage - 1) * ITEMS_PER_PAGE1;

  try {
    const movies = await sql`
      SELECT *
      FROM movies
      ORDER BY release_date DESC
      LIMIT ${ITEMS_PER_PAGE1}
    `;

    return movies.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch movies.");
  }
}
