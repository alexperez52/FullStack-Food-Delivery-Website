import React, { Component } from "react";
import axios from "axios";
import history from "../history";

export default class CreateRestaurantTool extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantName: "",
      imageURL: "",
      ratings: "",
      category: "",
      addressLine: "",
      town: "",
      state: "",
      zipCode: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async componentDidMount() {
    await axios.get("/currentUser").then((response) => {
      this.setState({
        restaurantName: response.data.restaurant.restaurantName,
        imageURL: response.data.restaurant.imageURL,
        ratings: response.data.restaurant.ratings,
        category: response.data.restaurant.category,
        addressLine: response.data.restaurant.address.addressLine,
        town: response.data.restaurant.address.town,
        state: response.data.restaurant.address.state,
        zipCode: response.data.restaurant.address.zipCode,
      });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      restaurantName: this.state.restaurantName,
      imageURL: this.state.imageURL,
      ratings: this.state.ratings,
      category: this.state.category,
    };

    const dataset2 = {
      addressLine: this.state.addressLine,
      town: this.state.town,
      state: this.state.state,
      zipCode: this.state.zipCode,
    };
    axios.post("/owner/restaurants", data).then((response) => {
      console.log(response);
    });

    axios.post("/restaurantAddress", dataset2).then((response) => {
      console.log(response);
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="restaurantName"
              name="restaurantName"
              placeholder="restaurant name"
              value={this.state.restaurantName}
              onChange={this.handleChange}
              required
            ></input>
          </div>
          <div>
            <input
              type="imageURL"
              name="imageURL"
              placeholder="image url"
              value={this.state.imageURL}
              onChange={this.handleChange}
              required
            ></input>
          </div>
          <div>
            <input
              type="ratings"
              name="ratings"
              placeholder="rartings"
              value={this.state.ratings}
              onChange={this.handleChange}
              required
            ></input>
          </div>
          <div>
            <input
              type="category"
              name="category"
              placeholder="category"
              value={this.state.category}
              onChange={this.handleChange}
              required
            ></input>

            <input
              type="addressLine"
              name="addressLine"
              placeholder="adress line"
              value={this.state.addressLine}
              onChange={this.handleChange}
              required
            ></input>

            <input
              type="town"
              name="town"
              placeholder="town"
              value={this.state.town}
              onChange={this.handleChange}
              required
            ></input>

            <input
              type="zipCode"
              name="zipCode"
              placeholder="zipCode"
              value={this.state.zipCode}
              onChange={this.handleChange}
              required
            ></input>

            <input
              type="state"
              name="state"
              placeholder="state"
              value={this.state.state}
              onChange={this.handleChange}
              required
            ></input>
            <button className="login-button" type="submit">
              submit restaurant
            </button>
          </div>
        </form>
      </div>
    );
  }
}
