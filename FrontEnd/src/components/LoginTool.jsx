import React, { Component } from "react";
import axios from "axios";
import history from './history'; 
export default class LoginTool extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
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
      userName: this.state.userName,
      password: this.state.password
    };

    axios
      .post("/login ", data)

      .then(response => {

        if(response.data === "Login Success"){
          
          const updateName = JSON.stringify(data.userName);
          console.log(JSON.stringify(data.userName));
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
              type="userName"
              name="userName"
              placeholder="Username"
              value={this.state.userName}
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
