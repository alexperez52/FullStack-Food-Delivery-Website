import React from "react";
import Navigation from "./Navigation";

function Header() {
  return (
    <div className="space-gap">
      <div className="left-align">
        <div>logo</div>
        <div><h3>Categories</h3></div>
        <div>
          <input placeholder="Search" className="input-input"/>
        </div>
      </div>
      <div className="right-align">
        <Navigation />
      </div>
    </div>
  );
}

export default Header;
