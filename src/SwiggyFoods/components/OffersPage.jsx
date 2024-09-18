import React from "react";
import OffersPageTopBar from "./OffersPageTopBar";
import Offers from "../../assets/images/Offers.png";
import { Link } from "react-router-dom";

function OffersPage() {
  return (
    <>
      <OffersPageTopBar />

      <div className="emptyCartPage">
        <div className="emptyCartBox">
          <div className="emptyCartImage">
            <img src={Offers} alt="" />
          </div>
          <div className="emptyCartString">
            <h2>Your cart is empty</h2>
            <p>You can go to home page to view more restaurants</p>
          </div>
          <div>
            <Link to="/landing" className="link">
              <button className="SEE-RESTAURANT-BUTTON">SEE OFFERS</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default OffersPage;
