import React, { Component } from "react";
import axios from "axios";
import history from "../history";
import { Link } from "react-router-dom";
import { useState } from "react";

export default class RestaurantPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      posts: [],
      restaurantName: "",
      imageURL: "",
      ratings: "",
      category: "",
      checkout: []
    };
  }

  async componentDidMount() {
    await this.setState({
      id: this.props.location.pathname.substring(
        this.props.location.pathname.lastIndexOf("/") + 1
      )
    });

    await axios
      .post("/specificRestaurant", {
        id: this.state.id
      })
      .then(response => {
        this.setState({
          restaurantName: response.data.restaurantName,
          imageURL: response.data.imageURL,
          ratings: response.data.ratings,
          category: response.data.category
        });
      });

    await axios
      .post("/restaurantItems", {
        id: this.state.id
      })
      .then(response => {
        const posts = response.data;
        this.setState({ posts });
      });

    console.log(this.state.imageURL);
  }

  async itemClick(e) {
    let floors = [...this.state.checkout];

    const data = {
      id: e.id,
      name: e.name,
      price: e.price,
      quantity: 1
    };

    var flag = false;
    for (var i = 0; i < floors.length; i++) {
      if (floors[i].id === e.id) {
        flag = true;
      }
    }

    if (floors.length === 0 || !flag) {
      floors.push(data);
      await this.setState({ checkout: floors });
    } else {
      for (var i = 0; i < floors.length; i++) {
        if (floors[i].id === e.id) {
          floors[i].quantity++;
          break;
        }
      }
    }

    await this.setState({ checkout: floors });
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <div className="horiz-align">
          <div className="rest-header">
            <div className="horiz-align">
              <div>
                <img className="large-pic" src={this.state.imageURL}></img>
              </div>
              <div className="info-card">
                <div className="info-labels">
                  <h1>{this.state.restaurantName}</h1>
                  <h2>{this.state.category}</h2>
                  <h2>{this.state.ratings}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="cart-div">
            <h3 className="cart-label">Cart</h3>
            <div className="shop-container">
              <div>
                {this.state.checkout.map((postDetail, index) => {
                  return (
                    <div key={index} className="check-item">
                      <div key={postDetail} className="items-gap">
                        <div>
                          <div className="restaurant-label">
                            {" "}
                            {postDetail.name}
                          </div>
                          <div className="description-label">
                            Description: {postDetail.description}
                          </div>
                          <div>Quantity: {postDetail.quantity}</div>
                          <div>ID: {postDetail.id}</div>
                          <div>
                            <button>+</button>
                            <button>-</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <button className="checkout-button">CHECKOUT</button>
          </div>
        </div>
        <div>
          <hr></hr>
        </div>
        <div>
          <div className="item-wrap">
            {this.state.posts.map((postDetail, index) => {
              return (
                <div key={postDetail.id}>
                  <div key={postDetail} className="items-gap">
                    <img className="small-pic" src={postDetail.imageURL}></img>
                    <div>
                      <div className="restaurant-label"> {postDetail.name}</div>
                      <div className="description-label">
                        Description: {postDetail.description}
                      </div>
                      <div className="description-label">
                        Price: {postDetail.price}
                      </div>
                      <div>
                        <button onClick={() => this.itemClick(postDetail)}>
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
