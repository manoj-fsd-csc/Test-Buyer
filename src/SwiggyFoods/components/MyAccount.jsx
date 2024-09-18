import React from "react";
import MyAccountTopBar from "./MyAccountTopBar";
import Account from "../../assets/images/Account.png";
import { Link } from "react-router-dom";

function MyAccount() {
  return (
    <>
      <MyAccountTopBar />

      <div className="accountPage">
        <div className="accountBox">
          <div className="accountImage">
            <img src={Account} alt="Account" />
          </div>
          <div className="accountString">
            <h2>Your cart is empty</h2>
            <p>You can go to home page to view more restaurants</p>
          </div>
          <div>
            <Link to="/landing" className="link">
              <button className="accountBUTTON">ACCOUNT</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyAccount;
