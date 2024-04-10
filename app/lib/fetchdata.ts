import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { movie } from "./definitions";

const ITEMS_PER_PAGE = 10;

export async function fetchMovies(query: string, currentPage: number) {
  noStore();
  const offset = currentPage * ITEMS_PER_PAGE;

  try {
    const movies = await sql<movie>`
      SELECT
      id,
      title,
      original_language,
      release_date,
      popularity,
      vote_average,
    FROM
        movies
    WHERE
        title ILIKE ${`%${query}%`} OR
        release_date::text ILIKE ${`%${query}%`} OR
        overview ILIKE ${`%${query}%`}
    ORDER BY
        release_date DESC
    LIMIT
        ${ITEMS_PER_PAGE}
    OFFSET
        ${offset}
    `;

    console.log("Fetched Movies List => ", movies.rows);

    return movies.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch movies.");
  }
}

export async function fetchMoviesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
      FROM movies
      WHERE
        title ILIKE ${`%${query}%`} OR
        overview ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of movies.");
  }
}

export async function fetchMovieById(id: string) {
  noStore();
  try {
    const data = await sql<movie>`
      SELECT *
      FROM movies
      WHERE id = ${id};
    `;

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch movie.");
  }
}
