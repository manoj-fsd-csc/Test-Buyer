import React from "react";
import HelpTopBar from "./HelpTopBar";
import Help from "../../assets/images/Help.png";
import { Link } from "react-router-dom";

function HelpPage() {
  return (
    <>
      <HelpTopBar />

      <div className="emptyCartPage">
        <div className="emptyCartBox">
          <div className="emptyCartImage">
            <img src={Help} alt="" />
          </div>
          <div className="emptyCartString">
            <h2>Your cart is empty</h2>
            <p>You can go to home page to view more restaurants</p>
          </div>
          <div>
            <Link to="/landing" className="link">
              <button className="SEE-RESTAURANT-BUTTON">HELP</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default HelpPage;
