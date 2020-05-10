import React, { Component } from "react";
import axios from "axios";
import history from "../history";
import SmallerDialog from "./SmallerDialog";

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
      submit: false,
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
      try {
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
      } catch (e) {}
    });
  }

  async handleSubmit(event) {
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
    await axios.post("/owner/restaurants", data).then((response) => {
      console.log(response);
    });

    await axios.post("/restaurantAddress", dataset2).then((response) => {
      console.log(response);
    });

    this.setState({ submit: true });
  }

  render() {
    return (
      <div className="dark">
        <SmallerDialog
          isOpen={this.state.submit}
          onClose={(e) => this.setState({ submit: false })}
        >
          <h3 className=" blac-text">Restaurant Submitted!</h3>
        </SmallerDialog>
        <div className="info-card dark">
          <div className="info-labels info-m">
            <h1 className="info-h1">{this.state.restaurantName}</h1>
            <h3 className="info-h2">Category: {this.state.category} </h3>
            <h3>
              Location: {this.state.addressLine} {this.state.town}{" "}
              {this.state.state} {this.state.zipCode}
            </h3>
            <h3>Ratings: {this.state.ratings} / 5.0</h3>
          </div>
        </div>
        <div className="rest-edit large dark">
          <div className="horiz-align dark">
            <div className="rest-he  dark">
              <div className="horiz-align dark">
                <div className="large-al">
                  <img className="large-pic " src={this.state.imageURL}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="cart-div-reg">
            <form onSubmit={this.handleSubmit}>
              <div>
                <div className="label-div-name">Restaurant Name</div>
                <div>
                  <input
                    className="name-input wi"
                    type="restaurantName"
                    name="restaurantName"
                    placeholder="Restaurant Name.."
                    value={this.state.restaurantName}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>

              <div>
                <div className="label-div-name">Image URL</div>
                <div>
                  <input
                    className="name-input wi"
                    type="imageURL"
                    name="imageURL"
                    placeholder="image url"
                    value={this.state.imageURL}
                    onChange={this.handleChange}
                    required
                  ></input>
                </div>
              </div>
              <div>
                <div className="label-div-name">Category</div>
                <div>
                  <input
                    className="name-input wi"
                    type="category"
                    name="category"
                    placeholder="category"
                    value={this.state.category}
                    onChange={this.handleChange}
                    required
                  ></input>
                </div>
              </div>
              <div>
                <div className="label-div-name">Address Line</div>
                <div>
                  <input
                    className="name-input wi"
                    type="addressLine"
                    name="addressLine"
                    placeholder="adress line"
                    value={this.state.addressLine}
                    onChange={this.handleChange}
                    required
                  ></input>
                </div>
              </div>
              <div>
                <div className="label-div-name">Town</div>
                <div>
                  <input
                    className="name-input wi"
                    type="town"
                    name="town"
                    placeholder="town"
                    value={this.state.town}
                    onChange={this.handleChange}
                    required
                  ></input>
                </div>
              </div>
              <div>
                <div className="label-div-name">Zipcode</div>
                <div>
                  <input
                    className="name-input wi"
                    type="zipCode"
                    name="zipCode"
                    placeholder="zipCode"
                    value={this.state.zipCode}
                    onChange={this.handleChange}
                    required
                  ></input>
                </div>
              </div>
              <div>
                <div className="label-div-name">State</div>
                <div>
                  <input
                    className="name-input wi"
                    type="state"
                    name="state"
                    placeholder="state"
                    value={this.state.state}
                    onChange={this.handleChange}
                    required
                  ></input>
                </div>
              </div>
              <button className="submit" type="submit">
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
