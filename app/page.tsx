'use client'

import React, { useState, useEffect } from "react";
import { CheckboxReactHookFormMultiple } from "@/components/SelectGenre";
import Suggestion from "@/components/Suggestion";
import { SearchIcon } from "lucide-react";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { useDebounce } from "use-debounce";


export default function Home() {


  const [searchResults, setSearchResults] = useState([]);
  const [text, setText] = useState('');
  // Debounce the input change
  const [query] = useDebounce(text, 500);

  useEffect(() => {
    
    const fetchBooks = async () => {
      if (query === '') {
        setSearchResults([]);
        return;
      }
      
      try {
        const { data } = await axios.get(`https://openlibrary.org/search.json?title=${query}&page=1&limit=10`);
        setSearchResults(data.docs);
        console.log(searchResults);
      }
      catch (error) {
        console.error(error);
      }

    }
    fetchBooks();
      
    
  }, [query]);






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
          />
        </div>

        <h3 className="text-2xl font-semibold mt-10 text-gray-700">
          1. Add your favorite books
        </h3>
        <p className="text-gray-500">(add at least 3)</p>

        <div className={`w-[80%] mt-10 px-6 py-3 border border-gray-400 rounded-3xl ${searchResults.length > 0 ? 'divide-y divide-gray-300' : ''} `}>
          <div className={`flex space-x-3 items-center ${searchResults.length > 0 && 'pb-3'}`}>
            <SearchIcon className="w-6 h-6 text-blue-600 cursor-pointer" />
            <input
              type="text"
              placeholder="Search for a book or author"
              onChange={(e) => setText(e.target.value)}
              className="focus:outline-none focus:shadow-none w-full font-extralight text-gray-500"
              onBlur={() => setSearchResults([])}
              onFocus={() => setSearchResults([])}
            />
          </div>
          <div className={`text-left ${searchResults.length > 0 ? 'pt-3' : 'h-0'}`}>
            <ul>
              { searchResults?.slice(0,5).map((result, index) => 
              (<li key={index} className="text-md text-gray-500 px-1 py-2 flex justify-between hover:bg-slate-200 bg-opacity-50 rounded-md">
              {result.title}
              <PlusIcon className="text-blue-600 cursor-pointer" />
            </li>)
              )}
              {/* <li className="text-md text-gray-500 px-1 py-2 flex justify-between hover:bg-slate-200 bg-opacity-50 rounded-md">
                Example: Harry Potter, J.K. Rowling
                <PlusIcon className="text-blue-600 cursor-pointer" />
              </li>
              <li className="text-md text-gray-500 px-1 py-2 flex justify-between hover:bg-slate-200 bg-opacity-50 rounded-md">
                Example: Harry Potter, J.K. Rowling
                <PlusIcon className="text-blue-600 cursor-pointer" />
              </li>
              <li className="text-md text-gray-500 px-1 py-2 flex justify-between hover:bg-slate-200 bg-opacity-50 rounded-md">
                Example: Harry Potter, J.K. Rowling
                <PlusIcon className="text-blue-600 hover:text-blue-800 cursor-pointer" />
              </li>
              <li className="text-md text-gray-500 px-1 py-2 hover:bg-slate-200 bg-opacity-50 rounded-md">
                Example: The Hobbit, J.R.R. Tolkien
              </li> */}
            </ul>
          </div>
        </div>
        <h3 className="text-2xl font-semibold mt-10 text-gray-700">
          2. Select your favorite genres
        </h3>
        <p className="text-gray-500">(Select at least 1)</p>
        <div className="w-[80%] border border-gray-400 rounded-2xl my-10">
          <CheckboxReactHookFormMultiple />
        </div>
      </div>

        <Suggestion />

    </main>
  );
}

