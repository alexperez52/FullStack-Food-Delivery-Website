import React, { Component } from "react";
import axios from "axios";
import history from './history'; 

export default class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            email: "",


        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);


    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })

    }


    handleSubmit(event) {

        event.preventDefault();
        const data = {

            username: this.state.username,
            password: this.state.password,
            email: this.state.email

        };

        axios.post("/users", data)
            .then(function (body) {
                console.log(body);
            });
        console.log("Form submitted");
    


    }

    clicked() {

        axios.get("/users").then(response => console.log(response.data));
       

    };



    render() {
        return(
            <div className="acontainer">
      <div className="App_Card">
        <form onSubmit={this.handleSubmit} >
          <div >
            <div className="name-form" size="16">
              <div className="name-container">
                <div className="first-name-container">
                  <div className="first-name-label" size ="4">
                    <label className="first-name-block" display="block">
                      First Name
                    </label>
                  </div>
                  <div className="first-name-input">
                    <div className="input-container">
                      <div className="input-actual">
                        <input
                         id="FieldWrapper-0"
                         className="input-textfield"

                        type="username"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        required
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="name-container">
                <div className="first-name-container">
                  <div className="first-name-label" size ="4">
                    <label className="first-name-block" display="block">
                      Last Name
                    </label>
                  </div>
                  <div className="last-name-input">
                    <div className="input-container" size ="16">
                      <div className="input-actual">
                        <input
                        id="FieldWrapper-0"
                          className="input-textfield"
                        //   type="password"
                          name="password"
                        //   value={this.state.password}
                            //   onChange={this.handleChange}
                          required
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="name-form1" size="16">
              <div className="name-container">
                <div className="first-name-container">
                  <div className="first-name-label" size ="4">
                    <label className="first-name-block" display="block">
                      Email
                    </label>
                  </div>
                  <div className="first-name-input1">
                    <div className="input-container1">
                      <div className="input-actual1">
                        <input
                         id="FieldWrapper-0"
                         className="input-textfield1"

                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              <div className="name-form1" size="16">
              <div className="name-container">
                <div className="first-name-container">
                  <div className="first-name-label" size ="4">
                    <label className="first-name-block" display="block">
                      Password
                    </label>
                  </div>
                  <div className="first-name-input1">
                    <div className="input-container1">
                      <div className="input-actual1">
                        <input
                         id="FieldWrapper-0"
                         className="input-textfield1"

                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
          <button type="submit">Register</button>
          <button onClick={this.clicked}>The Button</button>

        </form>
      </div>
      </div>
        
        )};

}
