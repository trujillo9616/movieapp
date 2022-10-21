// SearchBar component
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("searching for: ", search);
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${search}`
    );
    setSearchResults(response.data.results);
    console.log("search results: ", searchResults);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder={"Search for a movie, tv show, person..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-white text-xl font-semibold"
        />
        <button type="submit" className="px-4">
          <Image
            src="/search.png"
            alt="search icon"
            width={20}
            height={20}
            layout="fixed"
          />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
