import React, { Component } from "react";
import axios from "axios";
import history from './history'; 
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

        if(response.statusText === "OK"){
          
          const updateName = JSON.stringify(data.username);
          console.log(JSON.stringify(data.username));
          history.push("/LoginSuccess");
        }
        else{
          history.push("/LoginFail");
        }
        console.log(response);
      });
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
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
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
