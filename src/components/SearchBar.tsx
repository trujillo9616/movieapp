// SearchBar component
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import SearchResult from "./SearchResult";

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value.length > 1) {
      setIsOpen(true);
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${search}`
      );
      setSearchResults(
        res.data.results.length > 5
          ? res.data.results.slice(0, 5)
          : res.data.results
      );
    } else {
      setIsOpen(false);
      setSearchResults([]);
    }
  };

  return (
    <div>
      <div className="flex flex-row">
        <input
          type="text"
          placeholder={"Search for a movie, etc..."}
          value={search}
          onChange={(e) => handleSearch(e)}
          className="bg-transparent text-white text-xl font-semibold w-auto"
        />
        <Image
          src="/search.png"
          alt="search icon"
          width={20}
          height={20}
          layout="fixed"
        />
      </div>
      {isOpen && (
        <div className="absolute bg-gray-800 w-60 z-40">
          {searchResults.map((result) => (
            <SearchResult key={result.id} {...result} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
