import React, { Component } from "react";
import axios from "axios";
import history from "../history";
import { Link } from "react-router-dom";
import Dialog from "./Dialog";
import Owner from "./owner.svg";
import Delivery from "./delivery.svg";
import Customer from "./customer.svg";
import GlobalContext from "/home/alexis/Desktop/Kitchen-Delivery/FrontEnd/src/components/auth/userContext.js";

export default class FunctionalLoginTool extends Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isOpen: true,
      isRegister: false,
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      role: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitReg = this.handleSubmitReg.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmitReg(event) {
    event.preventDefault();
    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      role: {
        role: this.state.role
      }
    };

    axios.post("/users", data).then(function(body) {
      console.log(body);
      console.log(data);
    });
    this.setState({ isRegister: false });
    console.log("Form submitted");
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    const { setIsLoggedIn, setCurrentUser } = this.context;

    axios
      .post("/login ", data)
      .then(response => {
        if (response.statusText === "OK" && response.data.username != "") {
          if (response.data.role.role === "OWNER") {
            setCurrentUser("OWNER");
            setIsLoggedIn(true);
            this.setState({ isOpen: false });
          } else if (response.data.role.role === "CUSTOMER") {
            setCurrentUser("CUSTOMER");
            setIsLoggedIn(true);
          } else if (response.data.role.role === "DRIVER") {
            setCurrentUser("DRIVER");
            setIsLoggedIn(true);
          }
        } else {
          history.push("/LoginFail");
        }
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        history.push("/lol");
      });
  }

  render() {
    let reg = (
      <div className="functional-card">
        <button
          className="dialogCloseButtonStyles"
          onClick={this.props.onClose}
        >
          x
        </button>
        <form onSubmit={this.handleSubmitReg}>
          <div className="container-div">
            <div className="content-container-div">
              <div className="login-text">
                <label>Registration</label>
              </div>
            </div>

            <div className="horizontal-align">
              <div>
                <div className="label-div-name">First Name</div>
                <div className="input-div">
                  <input
                    className="name-input"
                    type="firstName"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>

              <div>
                <div className="label-div-name">Last Name</div>
                <div className="input-div">
                  <input
                    className="name-input"
                    type="lastName"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
            </div>
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
          <div className="label-div">Email</div>
          <div className="input-div">
            <input
              className="input-input"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            ></input>
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

          <div className="login-text">Select Account Type</div>
          <div className="horizontal-align">
            <div>
              <button
                className="button-style"
                type="button"
                onClick={() => this.setState({ role: "OWNER" })}
              >
                <label className="selection-label">Owner</label>

                <img src={Owner} className="selection-image"></img>
              </button>
            </div>
            <div>
              <button
                className="button-style"
                type="button"
                onClick={() => this.setState({ role: "DRIVER" })}
              >
                <label className="selection-label">Driver</label>

                <img src={Delivery} className="selection-image"></img>
              </button>
            </div>
            <div>
              <button
                className="button-style"
                type="button"
                onClick={() => this.setState({ role: "CUSTOMER" })}
              >
                <label className="selection-label">Customer</label>
                <img src={Customer} className="selection-image"></img>
              </button>
            </div>
          </div>
          <div>
            <label>{this.state.role}</label>
          </div>
          <button className="login-button" type="submit">
            Register
          </button>
          <div className="content-container-div">
            Already have an account?{" "}
            <a
              className="register-label"
              onClick={e => this.setState({ isRegister: false, isOpen: true })}
            >
              Login
            </a>
          </div>
        </form>
      </div>
    );
    let dialog = (
      <div className="functional-card">
        <button
          className="dialogCloseButtonStyles"
          onClick={this.props.onClose}
        >
          x
        </button>
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
            <a
              className="register-label"
              onClick={e => this.setState({ isRegister: true, isOpen: true })}
            >
              Register
            </a>
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
    );

    if (!this.props.isOpen || !this.state.isOpen) {
      return null;
    }

    if (this.state.isRegister) {
      return <div>{reg}</div>;
    } else {
      return <div>{dialog}</div>;
    }
  }
}
