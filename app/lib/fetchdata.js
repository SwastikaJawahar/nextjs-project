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
