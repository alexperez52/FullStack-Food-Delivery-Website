import React, { Component } from "react";
import axios from "axios";
import history from "../history";
import { Link } from "react-router-dom";
import { useState } from "react";
import GlobalContext from "/home/alexis/Desktop/Kitchen-Delivery/FrontEnd/src/components/auth/userContext.js";
import Dialog from "./Dialog";
import Login from "/home/alexis/Desktop/Kitchen-Delivery/FrontEnd/src/login.svg";
import LoginTool from "./FunctionalLoginTool";
import CreditCard from "/home/alexis/Desktop/Kitchen-Delivery/FrontEnd/src/components/images/creditcard.png";

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
      noItems: false,
      check: false,
      receipt: false,
      responseData: [],
      priceData: "",
      bill: ""
    };
    this.checkoutBtn = this.checkoutBtn.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
    this.checkLog = this.checkLog.bind(this);
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

  async itemMinus(e) {
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
          floors[i].quantity--;
          if (floors[i].quantity === 0) {
            floors.splice(i);
          }
        }
      }
    }

    await this.setState({ checkout: floors });
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
      tax: tax.toFixed(2),
      time: time,
      rawBill: totalCost.toFixed(2),
      bill: totalCostTax.toFixed(2),
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
          this.setState({
            check: false,
            receipt: true,
            responseData: floors,
            priceData: data,
            checkout: []
          });
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

  checkLog() {
    if (this.state.checkout.length === 0) {
      this.setState({ noItems: true });
    } else {
      if (this.context.isLoggedIn) {
        var floors = this.state.checkout;
        var totalCost = 0;
        for (var i = 0; i < floors.length; i++) {
          totalCost += floors[i].quantity * floors[i].price;
        }
        var totalCostTax = totalCost * 1.0865;

        this.setState({ bill: totalCostTax.toFixed(2) });
        this.setState({ check: true });
      } else {
        this.setState({ isOpen: true });
      }
    }
  }

  showStatus() {
    history.replace("/status");
  }

  loginClicked() {
    this.setState({ isOpen: false, loginIsOpen: true });
  }
  render() {
    return (
      <div>
        <Dialog
          isOpen={this.state.receipt}
          onClose={e => this.setState({ receipt: false })}
        >
          <div className="full-receipt">
            <div className="receipt-titles">
              <label>Name</label>
              <label>Quantity</label>
              <label>Price</label>
            </div>

            <div className="receipt-items">
              {this.state.responseData.map((postDetail, index) => {
                return (
                  <div key={index}>
                    <div className="receipt-titles">
                      <div>{postDetail.name}</div>
                      <div>{postDetail.quantity}</div>
                      <div>{postDetail.price} </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="receipt-price">
              <div>
                <div>
                  <label>Tax: </label>
                  <label>{this.state.priceData.tax}</label>
                </div>
              </div>
              <div>
                <div>
                  <label>Total: </label>
                  <label>{this.state.priceData.bill}</label>
                </div>
              </div>
            </div>

            <div className="shipment-info"></div>
          </div>
          <button onClick={e => this.showStatus()}> view status</button>
          <button onClick={e => this.setState({ receipt: false })}>
            {" "}
            close
          </button>
        </Dialog>

        <Dialog
          isOpen={this.state.check}
          onClose={e => this.setState({ check: false })}
        >
          <div>
            <img src={CreditCard} className="card-size"></img>
          </div>
          <div className="center-content">
            <form>
              <div>
                <label>Card Number</label>
              </div>
              <div>
                <input
                  className="input-input"
                  type="input"
                  name="tel"
                  pattern="[0-9]*"
                  value={this.state.number}
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="lab-gap">
                <label>Expiration </label>

                <label>CV-Code</label>
              </div>
              <div className="t">
                <div className="input-div">
                  <input
                    className="name-input"
                    type="date"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  ></input>{" "}
                  <input
                    className="name-input"
                    type="password"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>

              <div>
                <div>
                  <label>Card Holder</label>
                </div>
                <input
                  className="input-input"
                  type="input"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                ></input>
              </div>
              <hr></hr>
              <div>
                <div>
                  <div className="e">
                    <label>Address-Line </label>

                    <label>Town</label>
                  </div>
                  <div className="t">
                    <div className="input-div">
                      <input
                        className="name-input"
                        type="address"
                        name="address"
                        value={this.state.firstName}
                        onChange={this.handleChange}
                      ></input>{" "}
                      <input
                        className="name-input"
                        type="town"
                        name="town"
                        value={this.state.firstName}
                        onChange={this.handleChange}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="f">
                  <label>Zipcode </label>

                  <label>State</label>
                </div>
                <div className="t">
                  <div className="input-div">
                    <input
                      className="name-input"
                      type="input"
                      name="zipcode"
                      value={this.state.firstName}
                      onChange={this.handleChange}
                    ></input>{" "}
                    <input
                      className="name-input"
                      type="input"
                      name="state"
                      value={this.state.firstName}
                      onChange={this.handleChange}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="button-sp">
                {" "}
                <button className="alert-button" onClick={this.checkoutBtn}>
                  Pay {this.state.bill}
                </button>
                <button className="alert-button-cancel">cancel</button>
              </div>
            </form>
          </div>
        </Dialog>

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
                            <button onClick={() => this.itemClick(postDetail)}>
                              +
                            </button>
                            <button onClick={() => this.itemMinus(postDetail)}>
                              -
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <button className="checkout-button" onClick={this.checkLog}>
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
