import Head from "next/head";
import styles from "../styles/Home.module.css";
import { fetchMovies } from "../app/lib/fetchdata";
import Pagination from "../app/ui/pagination";
import Search from "../app/ui/search";
import MoviesTable from "../app/ui/table";

export default function Home({ movies }) {
  const query = "";
  const currentPage = 1;
  const totalPages = 12;
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Movies</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search movies..." />
      </div>
      <MoviesTable query={query} currentPage={currentPage} />
      {/* <MoviesTable /> */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination
          totalPages={totalPages}
          // initialPage={currentPage}
          // onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const movies = await fetchMovies();
  return {
    props: { movies },
  };
}
