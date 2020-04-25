import React, {Component} from "react";
import axios from "axios";
import history from "../history";

export default class CreateRestaurantTool extends Component{
    constructor(props){
        super(props);

        this.state = {
         restaurantName: "",
         imageURL: "",
         ratings: "",
         category: ""   
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event){ 
        event.preventDefault();
        const data = {
            restaurantName: this.state.restaurantName,
            imageURL: this.state.imageURL,
            ratings: this.state.ratings,
            category: this.state.category
        }

        axios.post("/owner/restaurants", data)
        .then(response => {
            console.log(response);
        });
    }

    render(){
        return (
            <div>
                
                <form onSubmit={this.handleSubmit} >
                <div>
                <input type = "restaurantName"
                name = "restaurantName"
                value={this.state.restaurantName}
                onChange={this.handleChange}>
                </input>
                </div>
                <div>
                <input type = "imageURL"
                name = "imageURL"
                value={this.state.imageURL}
                onChange={this.handleChange}>
                </input>
                </div>
                <div>
                <input type = "ratings"
                name = "ratings"
                value={this.state.ratings}
                onChange={this.handleChange}>
                </input>
                </div>
                <div>
                <input type = "category"
                name = "category"
                value={this.state.category}
                onChange={this.handleChange}>
                </input>
                <button className="login-button" type="submit">
              submit restaurant
            </button>
                </div>
                




                </form>
            </div>
        );
    }


}