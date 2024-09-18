import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import { Link } from "react-router-dom";
import star from "../../assets/images/star.png";

const FirmCollections = () => {
  const [firmData, setFirmData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [activeCategory, setActiveCategory] = useState("all");

  const firmDataHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors`);
      const newFirmData = await response.json();
      setFirmData(newFirmData.vendors);
    } catch (error) {
      alert("Firm data not fetched");
      console.error("Firm data not fetched:-", error);
    }
  };

  useEffect(() => {
    firmDataHandler();
  }, []);

  const filterHandler = (region, category) => {
    setSelectedRegion(region);
    setActiveCategory(category);
  };

  const isRegionMatch = (itemRegions, selectedRegion) => {
    if (selectedRegion === "All") return true;
    return itemRegions.some(
      (region) => region.toLowerCase() === selectedRegion.toLowerCase()
    );
  };

  return (
    <>
      <div className="firmGroupBoxHeading">
        <h2>Restaurants with online food delivery in Chennai</h2>
      </div>
      <div className="filterButtons">
        <button
          onClick={() => filterHandler("All", "all")}
          className={activeCategory === "all" ? "activeButton" : ""}
        >
          All
        </button>
        <button
          onClick={() => filterHandler("south-india", "south-india")}
          className={activeCategory === "south-india" ? "activeButton" : ""}
        >
          South-Indian
        </button>
        <button
          onClick={() => filterHandler("north-india", "north-india")}
          className={activeCategory === "north-india" ? "activeButton" : ""}
        >
          North-Indian
        </button>
        <button
          onClick={() => filterHandler("chinese", "chinese")}
          className={activeCategory === "chinese" ? "activeButton" : ""}
        >
          Chinese
        </button>
        <button
          onClick={() => filterHandler("bakery", "bakery")}
          className={activeCategory === "bakery" ? "activeButton" : ""}
        >
          Bakery
        </button>
      </div>
      <section className="firmSection">
        {firmData.map((apple) => {
          return apple.firm.map((item) => {
            if (isRegionMatch(item.region, selectedRegion)) {
              return (
                <Link
                  to={`/products/${item._id}/${item.firmName}`}
                  className="link"
                  key={item._id}
                >
                  <div className="firmGroupBox">
                    <div className="firmGroup">
                      <img
                        src={`${API_URL}/uploads/${item.image}`}
                        alt={item.image}
                      />
                      <div className="firmOffer">{item.offer}</div>
                    </div>
                    <div className="firmDetails">
                      <strong>{item.firmName}</strong>
                      <br />
                      <div className="reviewStar">
                        <img
                          className="cartProductvegimg"
                          src={star}
                          alt="Non-Veg"
                        />
                        <div className="reviewStarCount">
                          4.1 <span>(27)</span>
                        </div>
                      </div>
                      <div className="firmArea">{item.region.join(",")}</div>
                      <div className="firmArea">{item.area}</div>
                    </div>
                  </div>
                </Link>
              );
            }
            return null;
          });
        })}
      </section>
    </>
  );
};

export default FirmCollections;
