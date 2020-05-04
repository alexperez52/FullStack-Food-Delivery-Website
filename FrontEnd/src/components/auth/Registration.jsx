import React, { Component } from "react";
import axios from "axios";
import history from "../history";
import Owner from "./owner.svg";
import Delivery from "./delivery.svg";
import Customer from "./customer.svg";
import { Link } from "react-router-dom";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      role: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      role: {
        role: this.state.role,
      },
    };

    axios.post("/users", data).then(function (body) {
      console.log(body);
      console.log(data);
      history.replace("/login");
    });
    console.log("Form submitted");
  }

  clicked() {
    axios.get("/users").then((response) => console.log(response.data));
  }

  render() {
    return (
      <div className="acontainer">
        <div className="App_Card">
          <form onSubmit={this.handleSubmit}>
            <div className="container-div">
              <div className="content-container-div">
                <div className="login-text">
                  <label>Registration</label>
                </div>
              </div>

              <div className="horizontal-align">
                <div>
                  <div className="label-div-name">First Name</div>
                  <div>
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
                  <div>
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
            <div>
              <input
                className="input-input"
                type="username"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="label-div">Email</div>
            <div>
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
              <Link to="login" className="register-label">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
