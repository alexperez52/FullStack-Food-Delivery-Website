import React, { Component } from "react";
import axios from "axios";
import history from "../history";
import { Link } from "react-router-dom";
import Dialog from "./Dialog";

export default class LoginTool extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password
    };

    axios
      .post("/login ", data)

      .then(response => {
        if (response.statusText === "OK" && response.data.username != "") {
          const updateName = JSON.stringify(data.username);
          console.log(JSON.stringify(data.username));

          if (response.data.role.role === "OWNER") {
            history.replace("/owner");
            window.location.reload();
          } else if (response.data.role.role === "CUSTOMER") {
            history.push("/");
          } else if (response.data.role.role === "DRIVER") {
            console.log("DRIVER");
          }
        } else {
          return <Dialog>Incorrect info</Dialog>;
          history.push("/LoginFail");
        }
        console.log(response);
      })
      .catch(error => history.push("/LoginFail"));
  }

  render() {
    return (
      <div className="acontainer">
        <div className="App_Card">
          <form onSubmit={this.handleSubmit}>
            <div className="container-div">
              <div className="content-container-div">
                <div className="login-text">
                  <label>Sign In</label>
                </div>
                <div className="label-div">Username</div>
                <div className="input-div">
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
                <div className="input-div">
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
