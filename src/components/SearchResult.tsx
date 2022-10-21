import React from "react";
import Link from "next/link";

interface SearchResultProps {
  id: number;
  media_type: string;
  title: string | undefined;
  name: string | undefined;
}

const SearchResult: React.FC<SearchResultProps> = ({
  id,
  media_type,
  title,
  name,
}) => {
  if (media_type === "movie") media_type = "movies";
  if (media_type === "person") media_type = "people";
  return (
    <Link href={`/${media_type}/${id}`}>
      <a>
        <div className="px-2 py-2">
          <p className="text-xs font-thin">{media_type}</p>
          <p className="text-base font-normal">{title || name}</p>
        </div>
      </a>
    </Link>
  );
};

export default SearchResult;
