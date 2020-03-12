import React, { Component } from "react";
import axios from "axios";
import history from "../history";
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
        if (response.statusText === "OK") {
          const updateName = JSON.stringify(data.username);
          console.log(JSON.stringify(data.username));
          history.push("/LoginSuccess");
        } else {
          history.push("/LoginFail");
        }
        console.log(response);
      });
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
                  <input className="input-input"></input>
                </div>
              </div>
              <div className="content-container-div">
                <div className="label-div">Password</div>
                <div className="input-div">
                  <input className="input-input"></input>
                </div>
              </div>
              <div className="content-container-div">
                <div className="label-div"> Confirm Password</div>
                <div className="input-div">
                  <input className="input-input"></input>
                </div>
              </div>
            <div className="checkbox-div">
              Keep me logged in
            <input type="checkbox">
            </input>
            </div>
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
            <div className="content-container-div">
              Don't have an account?{" "}
            <a href="registration" className="register-label">Register</a>
            </div>
            <div>
            <div class="separator">Or login with</div>
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

{
  /* <div>
<input

  type="username"
  name="username"
  placeholder="Username"
  value={this.state.username}
  onChange={this.handleChange}
  required
/>
<input

  type="password"
  name="password"
  placeholder="Password"
  value={this.state.password}
  onChange={this.handleChange}
  required
/>
</div>
<button type="submit">Login</button> */
}