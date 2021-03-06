import React, { Component } from "react";
import axios from "axios";
import history from "./history";
import { Link } from "react-router-dom";
import GlobalContext from "../components/auth/userContext";

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
              <div className="dropdown">
                <button className="PageSwitcher__Item dropbtnowner">
                  Welcome {this.context.username}
                </button>
                <div className="dropdown-content">
                  <Link to="/account">My Account</Link>
                  <Link to="/analytics">Analytics</Link>
                  <Link to="/owner/restaurants">Restaurant Page</Link>
                </div>
              </div>
            )}

            {this.context.currentUser === "CUSTOMER" && (
              <div className="dropdown">
                <button className="PageSwitcher__Item dropbtn">
                  Welcome {this.context.username}
                </button>
                <div className="dropdown-content">
                  <Link to="/account">My account</Link>
                  <Link to="/status">Active Orders</Link>
                </div>
              </div>
            )}

            {this.context.currentUser === "DRIVER" && (
              <div className="dropdown">
                <button className="PageSwitcher__Item dropbtndriver">
                  Welcome {this.context.username}
                </button>
                <div className="dropdown-content">
                  <Link to="/account">My Account</Link>
                  <Link to="/orders">Find Orders</Link>
                  <Link to="/analytics">Analytics</Link>
                </div>
              </div>
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
