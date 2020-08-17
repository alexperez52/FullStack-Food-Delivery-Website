import React, { Component } from "react";
import GlobalContext from "../auth/userContext";
import Strong from "../images/strong.jpeg";
import axios from "axios";

export default class Account extends Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);
    this.state = {
      role: "",
      isLoggedIn: false,
      username: "",
      disabled: true,
      addressDisabled: true,
      addressLine: "",
      town: "",
      state: "",
      zipcode: "",
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.editAddress = this.editAddress.bind(this);
    this.submitAddress = this.submitAddress.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  async componentDidMount() {
    await axios.get("/currentUser").then((e) => {
      console.log(e);
      try {
        this.setState({
          username: e.data.username,
          email: e.data.email,
          firstName: e.data.firstName,
          lastName: e.data.lastName,
        });
      } catch (e) {
        console.log("error");
      }
    });
  }

  async submitInfo() {
    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    await axios.post("/updateUser", data).then((e) => {
      console.log(e);
      const loginInfo = {
        username: data.username,
        password: data.password,
      };

      axios.post("/login", loginInfo).then((e) => {
        console.log(e);
        window.location.reload();
      });
    });
  }

  submitAddress() {
    const data = {
      addressLine: this.state.addressLine,
      town: this.state.town,
      zipCode: this.state.zipcode,
      state: this.state.state,
    };

    axios.post("/address", data).then((e) => {
      console.log(e);
    });
  }

  editAddress() {
    if (this.state.addressDisabled) {
      this.setState({ addressDisabled: false });
    } else {
      this.setState({ addressDisabled: true });
    }
  }
  render() {
    return (
      <div className="account-container account-background">
        <div className="user-card account-label">
          <div>
            <div className="account-label push-down ">
              <img src={Strong} className="profile-pic"></img>
            </div>
            <div className="account-label push-down">
              {this.state.firstName} {this.state.lastName}
            </div>
            <div className="account-label push-down">
              <label className="green">{this.context.currentUser}</label>
            </div>
            <div className="account-label push-down">{this.state.email}</div>
            <div className="account-label push-down">
              <button className="account-btn" onClick={this.editAddress}>
                Update Info
              </button>
            </div>
          </div>
        </div>

        <div className="div-cards">
          <div>
            <h2 className="align-account-text">User settings</h2>
          </div>
          <input
            className="input-div"
            type="firstName"
            name="firstName"
            placeholder="First Name"
            value={this.state.firstName}
            onChange={this.handleChange}
            required
            disabled={this.state.addressDisabled}
          ></input>

          <input
            className="input-div"
            type="lastName"
            name="lastName"
            placeholder="Last Name"
            value={this.state.lastName}
            onChange={this.handleChange}
            required
            disabled={this.state.addressDisabled}
          ></input>

          <input
            className="input-div"
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
            disabled={this.state.addressDisabled}
          ></input>

          <input
            className="input-div"
            type="username"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            required
            disabled={this.state.addressDisabled}
          ></input>
          <input
            className="input-div"
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
            disabled={this.state.addressDisabled}
          ></input>

          <div className="account-label">
            <button
              disabled={this.state.addressDisabled}
              className="account-btn"
              onClick={this.submitInfo}
            >
              Submit
            </button>
          </div>
        </div>

        <div className="div-cards">
          <div>
            <h2 className="align-account-text">Address Settings</h2>
          </div>
          <input
            className="input-div"
            type="addressLine"
            name="addressLine"
            placeholder="Address Line"
            value={this.state.addressLine}
            onChange={this.handleChange}
            required
            disabled={this.state.addressDisabled}
          ></input>
          <input
            className="input-div"
            type="town"
            name="town"
            placeholder="Town"
            value={this.state.town}
            onChange={this.handleChange}
            required
            disabled={this.state.addressDisabled}
          ></input>
          <input
            className="input-div"
            type="state"
            name="state"
            placeholder="State"
            value={this.state.state}
            onChange={this.handleChange}
            required
            disabled={this.state.addressDisabled}
          ></input>
          <input
            className="input-div push-down"
            type="zipcode"
            name="zipcode"
            placeholder="Zipcode"
            value={this.state.zipCode}
            onChange={this.handleChange}
            required
            disabled={this.state.addressDisabled}
          ></input>
          <div className="account-label">
            <button
              disabled={this.state.addressDisabled}
              className="account-btn"
              onClick={this.submitAddress}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
