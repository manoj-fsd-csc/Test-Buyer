import React from "react";
import emptyCart from "../../assets/images/EmptyCart.png"; // Corrected import path
import { Link } from "react-router-dom";
const EmptyCart = () => {
  return (
    <>
      <div className="emptyCartPage">
        <div className="emptyCartBox">
          <div className="emptyCartImage">
            <img src={emptyCart} alt="" />
          </div>
          <div className="emptyCartString">
            <h2>Your cart is empty</h2>
            <p>You can go to home page to view more restaurants</p>
          </div>
          <div>
            <Link to="/landing" className="link">
              <button className="SEE-RESTAURANT-BUTTON">
                SEE RESTAURANTS NEAR YOU
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyCart;
