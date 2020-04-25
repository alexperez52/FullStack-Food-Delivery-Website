import React, {Component} from "react";
import axios from "axios";
import history from "../history";

export default class AddItemsTool extends Component{
    constructor(props){
        super(props);

        this.state = {
         name: "",
         description: "",
         price: "",
         imageURL: ""   
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
            name: this.state.name,
            description: this.state.imageURL,
            price: this.state.price,
            imageURL: this.state.imageURL
        }

        axios.post("/owner/restaurants/add", data)
        .then(response => {
        })
        .then(history.push("/owner/restaurants/add"));
    }

    render(){
        return (
            <div>
                
                <form onSubmit={this.handleSubmit} >
                <div>
                <input type = "name"
                name = "name"
                value={this.state.name}
                placeholder="name"
                onChange={this.handleChange}>
                </input>
                </div>
                <div>
                <input type = "description"
                name = "description"
                value={this.state.description}
                placeholder="description"
                onChange={this.handleChange}>
                </input>
                </div>
                <div>
                <input type = "price"
                name = "price"
                value={this.state.price}
                placeholder="price"
                onChange={this.handleChange}>
                </input>
                </div>
                <div>
                <input type = "imageURL"
                name = "imageURL"
                value={this.state.imageURL}
                placeholder="url"
                onChange={this.handleChange}>
                </input>
                <button  type="submit">
                add itemss
            </button>
                </div>
                




                </form>
            </div>
        );
    }


}