import React, { Component } from "react";
import axios from "axios";
import history from "./history";
import { Link } from "react-router-dom";
import GlobalContext from "/home/alexis/Desktop/Kitchen-Delivery/FrontEnd/src/components/auth/userContext.js";

export default class Navigation extends Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      role: ""
    };
    this.onclick = this.onclick.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoggedIn: this.context.isLoggedIn });
  }

  onclick() {
    const { setIsLoggedIn } = this.context;
    setIsLoggedIn(false);

    axios.post("/logout5").then(response => {
      history.replace("/");
    });
  }

  render() {
    return (
      <div>
        <div className="PageSwitcher">
          <div>
            {!this.context.isLoggedIn && (
              <Link to="/login" className="PageSwitcher__Item">
                Sign In
              </Link>
            )}
            {!this.context.isLoggedIn && (
              <Link to="/registration" className="PageSwitcher__Item">
                Sign Up
              </Link>
            )}
            {this.context.isLoggedIn && (
              <button onClick={this.onclick} className="PageSwitcher__Item">
                Logout{this.state.role}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
