import React, {Component} from "react";
import Navigation from "./Navigation.js";
import axios from "axios";
import history from "./history";

export default class Header extends Component{ 

constructor(props) {
  super(props);
}

  clicked() {
    history.push("/LoginSuccess");
  };

  render() {
    return (
    <div className="space-gap">
      <div className="left-align">
        <div>logo
          <button onClick={this.clicked}>The Button</button>      
            </div>
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
}

