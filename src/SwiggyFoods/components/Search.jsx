import React, { useRef, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import ItemsDisplay from "./ItemsDisplay";
import ProductMenuTopBar from "./ProductMenuTopBar";

function Search() {
  const inputRef = useRef(null);
  const [shouldFocus, setShouldFocus] = useState(false);

  const inputRefHandle = () => {
    setShouldFocus(true);
  };

  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
      setShouldFocus(false);
    }
  }, [shouldFocus]);

  return (
    <>
      <ProductMenuTopBar />
      <div className="searchInputPage">
        <div className="searchInputBox">
          <input
            className="searchInput"
            ref={inputRef}
            type="text"
            placeholder="Search for restaurant and foods"
          />
          <BiSearch className="searchIcon" onClick={inputRefHandle} />
        </div>
        <div className="searchInputPageItemDisplay">
          <ItemsDisplay className="ItemsDisplayPage" />
        </div>
      </div>

      <section className="productSection"></section>
    </>
  );
}

export default Search;
