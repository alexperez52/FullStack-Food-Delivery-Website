import React, { Component } from "react";
import axios from "axios";
import history from "./history";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      role: ""
    };
  }

  async componentDidMount() {
    await axios.get("/test").then(response => {
      if (response.data.role === null) {
        console.log(response);
        console.log("not logged in");
      } else {
        this.setState({ role: response.data.role.role });
        this.setState({ isLoggedIn: true });
        console.log(this.state.isLoggedIn);
        console.log(this.state.role);
      }
    });
  }

  onclick() {
    console.log("test");

    axios.post("/logout5").then(response => {
      history.replace("/");
      window.location.reload();
    });
  }

  render() {
    return (
      <div>
        <div className="PageSwitcher">
          <div>
            {!this.state.isLoggedIn && (
              <Link to="/login" className="PageSwitcher__Item">
                Sign In
              </Link>
            )}
            {!this.state.isLoggedIn && (
              <Link to="/registration" className="PageSwitcher__Item">
                Sign Up
              </Link>
            )}
            {this.state.isLoggedIn && (
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
