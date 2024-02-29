"use client";

import React, { useState, useEffect } from "react";
import { SelectGenre } from "@/components/SelectGenre";
import Suggestion from "@/components/Suggestion";
import { SearchIcon } from "lucide-react";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { useDebounce } from "use-debounce";
import BookImage from "@/components/BookImage";
import { BookSearchResult, BookSuggestion } from "@/types/types";
import { Book } from "@/types/types";

export default function Home() {
  const [searchResults, setSearchResults] = useState<BookSearchResult[]>([]);
  const [suggestionData, setSuggestionData] = useState<BookSuggestion>();
  const [text, setText] = useState("");
  const [displaySearchResults, setDisplaySearchResults] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<BookSearchResult[]>([]);
  // Debounce the input change
  const [query] = useDebounce(text, 500);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (query != "") {
          const { data }: { data: Book } = await axios.get(
            `https://openlibrary.org/search.json?title=${query}&page=1&limit=10`
          );
          setSearchResults(data.docs);
          console.log(searchResults);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, [query, displaySearchResults]);

  const handleBookSelection = (
    event: React.MouseEvent<HTMLLIElement>,
    book: BookSearchResult
  ) => {
    event.preventDefault(); // Prevent the default action of the click event
    // Your logic to handle book selection
    if (
      selectedBooks.some((selectedBook) => selectedBook.title === book.title) ==
      false
    ) {
      setSelectedBooks([...selectedBooks, book]);
    }
  };
  const handleBookRemoval = (index: number) => {
    setSelectedBooks(selectedBooks.filter((_, i) => i !== index));
  };

  const handleSuggestionData = (data: BookSuggestion) => {
    setSuggestionData(data);
  };

  return (
    <main className="w-[90%] mx-auto my-10 py-10 bg-white rounded-xl">
      <div className="left-side flex flex-col justify-center items-center">
        <div className="flex flex-col gap-3 items-center">
          <h1 className="text-4xl font-semibold text-center text-gray-700">
            Find Your Next Book
          </h1>
          <Image
            src="/read-this-next.png"
            width={1024}
            height={1024}
            alt="Read This Next"
            className="w-48 h-48"
            priority={true}
          />
        </div>

        <h3 className="text-2xl font-semibold mt-10 text-gray-700">
          1. Add your favorite books
        </h3>
        <p className="text-gray-500">(add at least 3)</p>

        <div
          className={`grid grid-cols-4 gap-x-3 items-center mt-10 ${
            selectedBooks.length > 0 && "p-6 bg-[#f3f3ee] md:rounded-md"
          }`}
        >
          {selectedBooks.map((book, index) => (
            <BookImage
              key={index}
              url={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} // Assuming the book object has a url property
              title={book.title} // Assuming the book object has a title property
              onRemove={() => handleBookRemoval(index)}
            />
          ))}
        </div>

        <div
          className={`w-[80%] lg:max-w-2xl  mt-10 px-6 py-3 border border-gray-400 rounded-3xl  ${
            searchResults.length > 0 && displaySearchResults
              ? "divide-y divide-gray-300"
              : ""
          } search-results-container`}
        >
          <div
            className={`flex space-x-3 items-center ${
              searchResults.length > 0 && displaySearchResults && "pb-3"
            }`}
          >
            <SearchIcon className="w-6 h-6 text-blue-600 cursor-pointer" />
            <input
              type="text"
              placeholder="search books to add"
              onChange={(e) => setText(e.target.value)}
              className="focus:outline-none focus:shadow-none w-full font-extralight text-gray-500"
              onBlur={(e) => {
                // Check if the related target is within the search results container
                if (
                  !e.relatedTarget ||
                  !e.relatedTarget.closest(".search-results-container")
                ) {
                  // Delay hiding the search results by  200 milliseconds
                  setTimeout(() => {
                    setDisplaySearchResults(false);
                  }, 200);
                }
              }}
              onFocus={() => setDisplaySearchResults(true)}
            />
          </div>
          <div
            className={`text-left ${
              searchResults.length > 0 && displaySearchResults ? "pt-3" : "h-0"
            }`}
          >
            <ul>
              {displaySearchResults &&
                searchResults?.slice(0, 5).map((result, index) => (
                  <li
                    key={index}
                    onClick={(event) => handleBookSelection(event, result)}
                    className="text-md text-gray-500 px-1 py-2 flex justify-between hover:bg-slate-200 bg-opacity-50 rounded-md"
                  >
                    {result.title}
                    <PlusIcon className="text-blue-600 cursor-pointer" />
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <h3 className="text-2xl font-semibold mt-10 text-gray-700">
          2. Select your favorite genres
        </h3>
        <p className="text-gray-500">(Select at least 1)</p>
        <div className="w-[90%] sm:w-[85%] md:w-[80%] lg:max-w-2xl border border-gray-400 rounded-2xl my-10">
          <SelectGenre
            selectedBooks={selectedBooks}
            onSuggestionData={handleSuggestionData}
          />
        </div>
      </div>

      {suggestionData && <Suggestion data={suggestionData} />}
    </main>
  );
}
