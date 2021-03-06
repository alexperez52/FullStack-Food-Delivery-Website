import React, { Component } from "react";
import axios from "axios";
import history from "../history";
import { Link } from "react-router-dom";
import Dialog from "./Dialog";
import GlobalContext from "../auth/userContext";
import SmallerDialog from "./SmallerDialog";

export default class LoginTool extends Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      login: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    const { setIsLoggedIn, setCurrentUser, setUserName } = this.context;

    axios
      .post("/login ", data)
      .then((response) => {
        if (response.statusText === "OK" && response.data.username != "") {
          if (response.data.role.role === "OWNER") {
            setCurrentUser("OWNER");
            setIsLoggedIn(true);
          } else if (response.data.role.role === "CUSTOMER") {
            setCurrentUser("CUSTOMER");
            setIsLoggedIn(true);
          } else if (response.data.role.role === "DRIVER") {
            setCurrentUser("DRIVER");
            setIsLoggedIn(true);
          }
          history.replace("/");
          setUserName(this.state.username);
        } else {
          history.push("/LoginFail");
        }
        console.log(response);
      })
      .catch((error) => this.setState({ login: true }));
  }

  render() {
    return (
      <div className="acontainer">
        <SmallerDialog
          isOpen={this.state.login}
          onClose={(e) => this.setState({ login: false })}
        >
          <h3 className=" blac-text">Login Fail!</h3>
        </SmallerDialog>
        <div className="App_Card">
          <form onSubmit={this.handleSubmit}>
            <div className="container-div">
              <div className="content-container-div">
                <div className="login-text">
                  <label>Sign In</label>
                </div>
                <div className="label-div">Username</div>
                <div>
                  <input
                    className="input-input"
                    type="username"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
              <div className="content-container-div">
                <div className="label-div">Password</div>
                <div>
                  <input
                    className="input-input"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
              <div className="checkbox-div">
                Keep me logged in
                <input type="checkbox"></input>
              </div>
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
            <div className="content-container-div">
              Don't have an account?{" "}
              <Link to="registration" className="register-label">
                Register
              </Link>
            </div>
            <div>
              <div className="separator">Or login with</div>
            </div>
            <button className="facebook-button" type="submit">
              Login with Facebook
            </button>
            <button className="google-button" type="submit">
              Login with Google
            </button>
          </form>
        </div>
      </div>
    );
  }
}
