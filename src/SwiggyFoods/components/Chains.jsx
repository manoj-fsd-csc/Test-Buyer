import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { HiOutlineChevronRight } from "react-icons/hi";
import { Oval } from "react-loader-spinner";
import { Link } from "react-router-dom";

function Chains() {
  const [vendorData, setVendorData] = useState([]);
  const [scrollPosition, setScrollPosition] = useState([0]);
  const [loading, setloading] = useState([true]);
  const handleScroller = (direction) => {
    const gallery = document.getElementById("chainGallery");
    const scrollAmount = 500;

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

  const vendorFirmHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors`);
      const newData = await response.json();
      setVendorData(newData);
      // console.log("newData",newData)
      // console.log("This is Api (all-vendors) Data:-",newData)
      setloading(false);
    } catch (error) {
      alert("Failed to fetch data");
      console.error(error);
      setloading(true);
    }
  };

  useEffect(() => {
    vendorFirmHandler();
  }, []);

  return (
    <>
      <div className="loaderSection">
        {loading && (
          <>
            <div className="loader">Loading...</div>

            <Oval
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </>
        )}
      </div>
      <div className="chainSectionTop">
        <div className="chainSectionTopTitle">
          <h2>Top restaurant in Chennai</h2>
        </div>
        <div className="btnSection">
          <button onClick={() => handleScroller("left")}>
            <HiOutlineChevronLeft className="btnSectionLeft" />
          </button>
          <button onClick={() => handleScroller("right")}>
            <HiOutlineChevronRight className="btnSectionRight" />
          </button>
        </div>
      </div>
      <section
        className="chainSection"
        id="chainGallery"
        onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
      >
        {vendorData.vendors &&
          vendorData.vendors.map((vendor) => {
            return (
              <>
                <div className="vendorBox">
                  {vendor.firm.map((item) => {
                    return (
                      <>
                        <Link
                          to={`/products/${item._id}/${item.firmName}`}
                          className="link"
                          key={item._id}
                        >
                          <div>
                            {/*  {item.firmName}  */}
                            <div className="firmImage">
                              {<img src={`${API_URL}/uploads/${item.image}`} />}
                              <div className="chainfirmOffer">{item.offer}</div>
                            </div>
                            <div className="firmDetails">
                              <strong>{item.firmName}</strong>
                              <br />
                              <div className="firmArea">
                                {item.region.join(",")}
                              </div>
                              <div className="firmArea">{item.area}</div>
                            </div>
                          </div>
                        </Link>
                      </>
                    );
                  })}
                </div>
              </>
            );
          })}
      </section>
    </>
  );
}

export default Chains;
