export function MovieSkeleton() {
  return (
    <div className="flex flex-col items-center justify-between border-b border-gray-100 py-4 md:flex-row">
      <div className="flex items-center">
        <div className="mr-4 h-16 w-16 rounded-md bg-gray-200" />
        <div className="min-w-0">
          <div className="h-6 w-40 rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-24 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="flex items-center">
        <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
        <div className="ml-4 h-4 w-16 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}
export function MoviesTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <MovieSkeleton />
            <MovieSkeleton />
            <MovieSkeleton />
            <MovieSkeleton />
            <MovieSkeleton />
            <MovieSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Poster
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Movie Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Release Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Popularity
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Vote Average
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Overview
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <MovieSkeleton />
              <MovieSkeleton />
              <MovieSkeleton />
              <MovieSkeleton />
              <MovieSkeleton />
              <MovieSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
