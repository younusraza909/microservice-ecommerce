import { Search } from "lucide-react";
import React from "react";

const Searchbar = () => {
  return (
    <div className="items-center gap-2 hidden md:flex rounded-md ring-1 ring-gray-200 px-2 py-1 shadow-md">
      <Search className="w-4 h-4 text-gray-500" />
      <input
        id="search"
        type="text"
        placeholder="Search"
        className="text-sm outline-none"
      />
    </div>
  );
};

export default Searchbar;
