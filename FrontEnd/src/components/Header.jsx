import React, { Component } from "react";
import Navigation from "./Navigation";
import axios from "axios";
import history from "./history";
import Logo from "./images/logo.png";
import GlobalContext from "/home/alexis/Desktop/Kitchen-Delivery/FrontEnd/src/components/auth/userContext.js";
import Exc from "./images/exc.png";
import Dialog from "./auth/Dialog";

export default class Header extends Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);

    this.state = {
      currentUser: "",
    };
    this.clicked = this.clicked.bind(this);
  }

  async componentDidMount() {
    await axios.get("/currentUser").then((e) => {
      this.setState({
        currentUser: this.context.currentUser,
      });
    });
  }

  clicked() {
    const { setCurrentUser } = this.context;
    // history.push("/");
    history.push("/");
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
            <label className="logo-text logo-col">e</label>
            <label className="logo-text">diboo</label>
          </div>
          <img className="exc" src={Exc}></img>
        </div>
        <div className="right-align">
          <Navigation />
        </div>
      </div>
    );
  }
}
