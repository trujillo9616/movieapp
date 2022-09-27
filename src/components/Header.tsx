import React from "react";
import Link from "next/link";

const sections = [
  { title: "Movies", url: "/movies" },
  { title: "TV Shows", url: "/tv" },
  { title: "People", url: "/people" },
];
const Header: React.FC = () => {
  return (
    <div className="w-screen h-24 flex flex-row text-sm md:text-xl leading-normal font-extrabold text-gray-200 text-ellipsis">
      <div className="w-1/3 p-8 self-center">
        <Link href="/">
          <a>
            <h1>MovieApp</h1>
          </a>
        </Link>
      </div>
      <div className="w-1/3 p-2 self-center">
        <h1>SearchBar</h1>
      </div>
      <div className="flex flex-row w-1/3 space-x-16 justify-center p-2 self-center">
        {sections.map((section) => (
          <div key={section.title}>
            <Link href={section.url}>
              <a className="hover:text-purple-500">{section.title}</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
