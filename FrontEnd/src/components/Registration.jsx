import React, { Component } from "react";
import axios from "axios";
import history from './history'; 

export default class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
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

            userName: this.state.userName,
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
        return <div>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <input
                        type="userName"
                        name="userName"
                        placeholder="Username"
                        value={this.state.userName}
                        onChange={this.handleChange}
                        required />
                </div>
                <br></br>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required />
                </div>
                <br></br>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required />
                </div>
                <br></br>
                <button type="submit">Register</button>
            </form>
            <br></br>
            <button onClick={this.clicked}>The Button</button>
        </div>
    }

}
