import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <p>
        For Better Experience Download <br />
        Swiggy App
      </p>
      <div className="app-download-platform">
        <Link to="https://play.google.com/store/search?q=swiggy&c=apps">
          <img src={assets.play_store} />
        </Link>

        <Link to="https://play.google.com/store/search?q=swiggy&c=apps">
          <img src={assets.app_store} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default AppDownload;
