import { useState } from "react";
import "./SearchBar.css";

function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <img
        src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
        alt="Search"
        className="search-icon"
      />
    </div>
  );
}

export default SearchBar;