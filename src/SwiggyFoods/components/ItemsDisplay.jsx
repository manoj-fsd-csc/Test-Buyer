import React, { useState } from "react";
import { itemData } from "../data";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { HiOutlineChevronRight } from "react-icons/hi";
import knifeCursor from "../../assets/images/knife.png";
function ItemsDisplay() {
  const [displayItem, setDisplayItem] = useState(itemData);
  const [scrollPosition, setScrollPosition] = useState([0]);
  // console.log("Static Images Data:-",displayItem)

  const handleScroller = (direction) => {
    const gallery = document.getElementById("itemSectionGallery");
    const scrollAmount = 480;

    if (direction === "left") {
      gallery.scrollTo({
        left: gallery.scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    } else if (direction === "right") {
      gallery.scrollTo({
        left: gallery.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };
  let MclientName = ((clientName) =>
    clientName ? clientName.slice(0, 5) : "")(
    localStorage.getItem("clientName")
  );
  return (
    <>
      <div className="itemSectionTitle">
        <h2>{MclientName},What's on your mind?</h2>
        <div className="itemSectionScrollButtons">
          <button onClick={() => handleScroller("left")}>
            <HiOutlineChevronLeft />
          </button>
          <button onClick={() => handleScroller("right")}>
            <HiOutlineChevronRight />
          </button>
        </div>
      </div>
      <section
        id="itemSectionGallery"
        style={{ cursor: `url(${knifeCursor}), auto` }}
        className="itemSection"
        onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
      >
        {displayItem.map((item) => {
          return (
            <div className="gallery">
              <img
                className="galleryImg"
                src={item.item_img}
                alt={item.item_img}
              />
            </div>
          );
        })}
      </section>
    </>
  );
}

export default ItemsDisplay;
