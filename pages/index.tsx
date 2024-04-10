import Search from "../app/ui/search";
import { MoviesTableSkeleton } from "../app/ui/skeletons";
import MoviesTable from "../app/ui/table";
import { Suspense } from "react";
import { fetchMoviesPages } from "../app/lib/fetchdata";
import Pagination from "../app/ui/pagination";
export default async function MoviesPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchMoviesPages(query);

  console.log("query", query);
  console.log("Total Pages in Movies ", totalPages);
  console.log("Current Page in Movies ", currentPage);

  const handlePageChange = (page: number) => {
    // Add logic to handle page change if necessary
    // For example, updating the URL query parameter
  };

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Movies</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search movies..." />
      </div>
      {
        <Suspense key={query + currentPage} fallback={<MoviesTableSkeleton />}>
          <MoviesTable query={query} currentPage={currentPage} />
        </Suspense>
      }
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
