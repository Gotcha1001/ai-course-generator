import React from "react";
import { Search } from "lucide-react";

function SearchBar({ onSearch }) {
    return (
        <div className="flex gap-2 items-center p-3 border rounded-md bg-white mt-5 sm:w-[50%]">
            <Search className="text-primary" />
            <input
                onChange={(event) => onSearch(event.target.value)}
                type="text"
                placeholder="Search Courses..."
                className="p-1 rounded-xl bg-transparent w-full outline-none"
            />
        </div>
    );
}

export default SearchBar;
