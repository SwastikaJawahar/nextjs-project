import Head from "next/head";
import styles from "../styles/Home.module.css";
import { fetchMovies } from "../app/lib/fetchdata";
import Pagination from "../app/ui/pagination";
import Search from "../app/ui/search";

export default function Home({ movies }) {
  return (
    <div className={styles.container}>
      <main>
        <h1 className={styles.title}>Popular Movies</h1>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search invoices..." />
        </div>
        <div className={styles.moviesTable}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>id</th>
                <th>Adult</th>
                <th>Title</th>
                <th>Genre ID</th>
                <th>Language</th>
                <th>Popularity</th>
                <th>Release Date</th>
                <th>Vote Average</th>
                <th>Vote Count</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.id}</td>
                  <td>{movie.adult.toString()}</td>
                  <td>{movie.title}</td>
                  <td>{movie.genre_ids.join(", ")}</td>
                  <td>{movie.original_language}</td>
                  <td>{movie.popularity}</td>
                  <td>{new Date(movie.release_date).toLocaleDateString()}</td>
                  <td>{movie.vote_average}</td>
                  <td>{movie.vote_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export async function getStaticProps() {
  const movies = await fetchMovies();
  return {
    props: { movies },
  };
}
