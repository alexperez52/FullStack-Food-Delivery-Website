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
      currentUser: "",
      userName: "",
    };
    this.onclick = this.onclick.bind(this);
  }

  async componentDidMount() {
    await axios.get("/currentUser").then((e) => {
      const { setIsLoggedIn, setCurrentUser, setUserName } = this.context;

      if (e.data.username != null) {
        setUserName(e.data.username);
        setCurrentUser(e.data.role.role);
        setIsLoggedIn(true);
      }
      this.setState({ userName: this.context.username });
    });

    this.setState({
      isLoggedIn: this.context.isLoggedIn,
      currentUser: this.context.role,
    });
  }

  onclick() {
    const { setIsLoggedIn, setCurrentUser, setUserName } = this.context;
    // setIsLoggedIn(false);
    // setCurrentUser("");
    // setUserName("");
    axios.post("/logout5").then((response) => {
      history.replace("/");
      window.location.reload();
    });
    this.setState({
      isLoggedIn: this.context.isLoggedIn,
      currentUser: this.context.role,
      userName: this.context.username,
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

            {this.context.currentUser === "OWNER" && (
              <Link to="/login" className="PageSwitcher__Item Page_item">
                Welcome {this.context.username}
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
