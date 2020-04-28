import React, { Component } from "react";
import Navigation from "./Navigation";
import axios from "axios";
import history from "./history";
import Dihner from "./images/dihner.png";

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  clicked() {
    history.push("/");
  }

  testing() {
    console.log("clicked");
  }

  render() {
    return (
      <div className="space-gap">
        <div className="left-align">
          <div>
            <button onClick={this.clicked}>
              <img className="logo" src={Dihner}></img>
            </button>
          </div>
          <div>
            <h3 onClick={this.testing}>Categories</h3>
          </div>
          <div>
            <input placeholder="Search" className="input-input" />
          </div>
        </div>
        <div className="right-align">
          <Navigation />
        </div>
      </div>
    );
  }
}
