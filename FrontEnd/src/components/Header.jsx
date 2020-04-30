import React, { Component } from "react";
import Navigation from "./Navigation";
import axios from "axios";
import history from "./history";
import Logo from "./images/freelogo.png";
import GlobalContext from "/home/alexis/Desktop/Kitchen-Delivery/FrontEnd/src/components/auth/userContext.js";

export default class Header extends Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);

    this.state = {
      currentUser: ""
    };
    this.clicked = this.clicked.bind(this);
  }

  componentDidMount() {
    this.setState({ currentUser: this.context.currentUser });
  }

  clicked() {
    const { setCurrentUser } = this.context;
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
            <button onClick={this.clicked} className="button-logo">
              <img className="logo" src={Logo}></img>
            </button>
          </div>
          <div className="r12">
            <label className="logo-text" onClick={this.testing}>
              ediboo
            </label>
          </div>
          {/* <div>
            <input placeholder="Search" className="input-input" />
          </div> */}
        </div>
        <div className="right-align">
          <Navigation />
        </div>
      </div>
    );
  }
}
