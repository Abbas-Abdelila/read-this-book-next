import { SearchIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-4xl font-bold text-center">Read This Book Next</h1>
        <p className="text-center">
          Find your next book to read easily based on your favorite books and
          authors
        </p>
      </div>

      <div className="w-[40%] mt-10 px-6 py-3 border border-gray-400 rounded-3xl">
        <div className="flex space-x-3 items-center ">
          <SearchIcon className="w-6 h-6 text-blue-700 cursor-pointer" />
          <input
            type="text"
            placeholder="Search for a book or author"
            className="focus:outline-none focus:shadow-none w-full "
          />
        </div>
        <div className="mt-5 text-center divide-y">
            <p className="text-sm text-gray-500">
              Example: Harry Potter, J.K. Rowling
            </p>
            <p className="text-sm text-gray-500">
              Example: The Hobbit, J.R.R. Tolkien
            </p>
          </div>
      </div>
    </main>
  );
}
