import { SearchIcon } from "lucide-react";
import { PlusIcon } from "lucide-react";

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

      <div className="w-[40%] mt-10 px-6 py-3 border border-gray-400 rounded-3xl divide-y divide-gray-300">
        <div className="flex space-x-3 items-center pb-3">
          <SearchIcon className="w-6 h-6 text-blue-700 cursor-pointer" />
          <input
            type="text"
            placeholder="Search for a book or author"
            className="focus:outline-none focus:shadow-none w-full "
          />
        </div>
        <div className="text-left pt-3">
            <p className="text-md text-gray-500 px-1 py-2 flex justify-between hover:bg-slate-200 bg-opacity-50 rounded-md">
              Example: Harry Potter, J.K. Rowling
              <PlusIcon className="text-blue-800 cursor-pointer" />
            </p>
            <p className="text-md text-gray-500 px-1 py-2 flex justify-between hover:bg-slate-200 bg-opacity-50 rounded-md">
              Example: Harry Potter, J.K. Rowling
              <PlusIcon className="text-blue-800 cursor-pointer" />
            </p>
            <p className="text-md text-gray-500 px-1 py-2 hover:bg-slate-200 bg-opacity-50 rounded-md">
              Example: The Hobbit, J.R.R. Tolkien
            </p>
          </div>
      </div>
    </main>
  );
}
