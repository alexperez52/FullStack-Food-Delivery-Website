import React, { Component } from "react";
import axios from "axios";
import history from "../history";
import { Link } from "react-router-dom";
import { useState } from "react";
import GlobalContext from "/home/alexis/Desktop/Kitchen-Delivery/FrontEnd/src/components/auth/userContext.js";
import Dialog from "./Dialog";
import Login from "/home/alexis/Desktop/Kitchen-Delivery/FrontEnd/src/login.svg";
import LoginTool from "./FunctionalLoginTool";

export default class RestaurantPage extends Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      user: false,
      posts: [],
      restaurantName: "",
      imageURL: "",
      ratings: "",
      category: "",
      checkout: [],
      isOpen: false,
      loginIsOpen: false,
      noItems: false
    };
    this.checkoutBtn = this.checkoutBtn.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
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
  }

  async checkoutBtn() {
    var totalCost = 0;
    var itemsDescription = "";
    var floors = this.state.checkout;

    for (var i = 0; i < floors.length; i++) {
      totalCost += floors[i].quantity * floors[i].price;
      itemsDescription += floors[i].name + ":";
    }

    var tax = totalCost * 0.0865;
    var totalCostTax = totalCost + tax;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    var todayDate = mm + "/" + dd + "/" + yyyy;
    var time = new Date().toLocaleTimeString();

    const data = {
      tax: tax,
      time: time,
      rawBill: totalCost,
      bill: totalCostTax,
      information: itemsDescription,
      date: todayDate,
      restaurant: {
        id: this.state.id
      }
    };

    if (this.context.isLoggedIn) {
      if (floors.length > 0) {
        axios.post("/invoice", data).then(response => {
          console.log(response);
        });
      } else {
        this.setState({ noItems: true });
        console.log("no items!");
      }
    } else {
      this.setState({ isOpen: true });
      console.log("else");
    }
  }

  loginClicked() {
    this.setState({ isOpen: false, loginIsOpen: true });
  }
  render() {
    return (
      <div>
        <Dialog
          isOpen={this.state.noItems}
          onClose={e => this.setState({ noItems: false })}
        >
          Shopping cart is Empty !
        </Dialog>

        <LoginTool
          isOpen={this.state.loginIsOpen}
          onClose={e => this.setState({ loginIsOpen: false })}
        />

        <Dialog
          isOpen={this.state.isOpen}
          onClose={e => this.setState({ isOpen: false })}
        >
          <div>
            <div>
              <div className="horizontal-align">
                <img className="small-pic" src={Login}></img>
              </div>
              <label className="alert-text">
                Create an account or Login to
              </label>
            </div>
            <div>
              <label className="alert-text">continue to checkout.</label>
            </div>
            <div className="buttons">
              <button className="alert-button" onClick={this.loginClicked}>
                LOGIN
              </button>
              <button
                className="alert-button-cancel"
                onClick={e => this.setState({ isOpen: false })}
              >
                CANCEL
              </button>
            </div>
          </div>
        </Dialog>
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
            <button className="checkout-button" onClick={this.checkoutBtn}>
              CHECKOUT
            </button>
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
