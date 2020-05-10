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
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

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
      bill: "",
      addressLine: "",
      town: "",
      zipCode: "",
      state: "",
      invoiceId: "",
      size: "",
      reviews: [],
    };
    this.checkoutBtn = this.checkoutBtn.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
    this.checkLog = this.checkLog.bind(this);
  }

  async componentDidMount() {
    await this.setState({
      id: this.props.location.pathname.substring(
        this.props.location.pathname.lastIndexOf("/") + 1
      ),
    });

    await axios
      .post("/specificRestaurant", {
        id: this.state.id,
      })
      .then((response) => {
        this.setState({
          restaurantName: response.data.restaurantName,
          imageURL: response.data.imageURL,
          address: response.data.address.addressLine,
          town: response.data.address.town,
          zipCode: response.data.address.zipCode,
          state: response.data.address.state,
        });
      });

    await axios
      .post("/restaurantItems", {
        id: this.state.id,
      })
      .then((response) => {
        const posts = response.data;
        this.setState({ posts });
      });

    const id = {
      id: this.state.id,
    };

    await axios.post("/restaurantRatings", id).then((e) => {
      console.log(e);

      var size = e.data.length;
      var average = 0;
      var arr = [];
      for (var i = 0; i < size; i++) {
        arr.push(e.data[i].message);
        console.log(e.data[i].ratings);
        average += e.data[i].ratings;
      }
      average = average / size;
      console.log(arr);
      this.setState({ ratings: average, size: size, reviews: arr });
    });

    const ratings = {
      ratings: this.state.ratings,
      id: this.state.id,
    };
    await axios.put("/setRatings", ratings);
  }

  async itemMinus(e) {
    let floors = [...this.state.checkout];

    const data = {
      id: e.id,
      name: e.name,
      price: e.price,
      quantity: 1,
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
            floors.splice(i, 1);
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
      description: e.description,
      quantity: 1,
      imageURL: e.imageURL,
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
      itemsDescription += floors[i].name + " " + floors[i].quantity + "x |";
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
        id: this.state.id,
      },
    };

    if (this.context.isLoggedIn) {
      if (floors.length > 0) {
        axios.post("/invoice", data).then((response) => {
          console.log(response);
          this.setState({ invoiceId: response.data.id });
        });

        this.setState({
          check: false,
          receipt: true,
          responseData: floors,
          priceData: data,
          checkout: [],
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

  showStatus(e) {
    console.log(e);
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
          onClose={(e) => this.setState({ receipt: false })}
        >
          <div className="full-receipt">
            <div className="receipt-titles">
              <h2>Name</h2>
              <h2>Quantity</h2>
              <h2>Price</h2>
            </div>
            <div className="ale">
              <div className="receipt-items">
                {this.state.responseData.map((postDetail, index) => {
                  return (
                    <div className="receipt-titles">
                      <div key={index}>
                        <div>
                          <h3>{postDetail.name}</h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="receipt-items">
                {this.state.responseData.map((postDetail, index) => {
                  return (
                    <div className="receipt-titles">
                      <div key={index}>
                        <div>
                          <h3>{postDetail.quantity}</h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="receipt-items">
                {this.state.responseData.map((postDetail, index) => {
                  return (
                    <div className="receipt-titles">
                      <div key={index}>
                        <div>
                          <h3>{postDetail.price}</h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="receipt-titles">
              <div>
                <div>
                  <label>Tax: </label>
                  <label>
                    {Math.round(this.state.priceData.tax * 100) / 100}
                  </label>
                </div>
              </div>
              <div>
                <div>
                  <label>
                    Total: {Math.round(this.state.priceData.bill * 100) / 100}
                  </label>
                </div>
              </div>
            </div>

            <div className="shipment-info"></div>
          </div>
          <button
            className="header-btn1"
            onClick={(e) => this.showStatus(this.state.invoiceId)}
          >
            {" "}
            View status
          </button>
          <button
            className="header-btn1"
            onClick={(e) => this.setState({ receipt: false })}
          >
            {" "}
            close
          </button>
        </Dialog>

        <Dialog
          isOpen={this.state.check}
          onClose={(e) => this.setState({ check: false })}
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
                <input className="input-input"></input>
              </div>
              <div className="lab-gap">
                <label>Expiration </label>

                <label>CV-Code</label>
              </div>
              <div className="t">
                <div>
                  <input className="name-input"></input>{" "}
                  <input className="name-input"></input>
                </div>
              </div>

              <div>
                <div>
                  <label>Card Holder</label>
                </div>
                <input className="input-input"></input>
              </div>
              <hr></hr>
              <div>
                <div>
                  <div className="e">
                    <label>Address-Line </label>

                    <label>Town</label>
                  </div>
                  <div className="t">
                    <div>
                      <input className="name-input"></input>{" "}
                      <input className="name-input"></input>
                    </div>
                  </div>
                </div>
                <div className="f">
                  <label>Zipcode </label>

                  <label>State</label>
                </div>
                <div className="t">
                  <div>
                    <input className="name-input"></input>{" "}
                    <input className="name-input"></input>
                  </div>
                </div>
              </div>
              <div className="button-sp">
                {" "}
                <button className="alert-button" onClick={this.checkoutBtn}>
                  Pay {this.state.bill}
                </button>
                <button
                  className="alert-button-cancel"
                  onClick={(e) => this.setState({ check: false })}
                >
                  cancel
                </button>
              </div>
            </form>
          </div>
        </Dialog>

        <Dialog
          isOpen={this.state.noItems}
          onClose={(e) => this.setState({ noItems: false })}
        >
          Shopping cart is Empty !
        </Dialog>

        <LoginTool
          isOpen={this.state.loginIsOpen}
          onClose={(e) => this.setState({ loginIsOpen: false })}
        />

        <Dialog
          isOpen={this.state.isOpen}
          onClose={(e) => this.setState({ isOpen: false })}
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
                onClick={(e) => this.setState({ isOpen: false })}
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
                  <h1 className="info-h1">{this.state.restaurantName}</h1>
                  <h3 className="info-h2">Category: {this.state.category} </h3>
                  <h3>
                    Location: {this.state.address} {this.state.town}{" "}
                    {this.state.state} {this.state.zipCode}
                  </h3>
                  <h3>
                    Ratings: {Math.round(this.state.ratings * 100) / 100} (
                    {this.state.size})
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="cart-div">
            <h2 className="cart-label">Shopping Cart</h2>
            <div className="shop-container">
              <div>
                {this.state.checkout.map((postDetail, index) => {
                  return (
                    <div key={index} className="check-item">
                      <div key={postDetail} className="items-gap-cart">
                        <div>
                          <div className="restaurant-label-cart">
                            {postDetail.name}
                          </div>

                          <div>Quantity: {postDetail.quantity}</div>
                          <div>Price: {postDetail.price}</div>
                          <div>Description: {postDetail.description}</div>
                          <div>
                            <button onClick={() => this.itemClick(postDetail)}>
                              +
                            </button>
                            <button onClick={() => this.itemMinus(postDetail)}>
                              -
                            </button>
                          </div>
                          <div>
                            <img
                              src={postDetail.imageURL}
                              className="checkout-img"
                            ></img>
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
          <h1 className="menu-items-h1">Menu Items</h1>
          <div className="item-wrap">
            {this.state.posts.map((postDetail, index) => {
              return (
                <div key={postDetail.id}>
                  <div key={postDetail} className="items-gap">
                    <img
                      className="small-pic-card"
                      src={postDetail.imageURL}
                    ></img>
                    <div>
                      <div className="restaurant-label"> {postDetail.name}</div>
                      <div className="description-label">
                        Description: {postDetail.description}
                      </div>
                      <div className="description-label">
                        Price: {postDetail.price}
                      </div>
                    </div>
                    <button
                      className="addcard-btn"
                      onClick={() => this.itemClick(postDetail)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="menu-items-h1">
          <h1>Reviews:</h1>
        </div>
        <div className="menu-items-h1 bck">
          {" "}
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={50}
            totalSlides={3}
          >
            <Slider>
              <Slide index={0}>{this.state.reviews[0]}</Slide>
              <Slide index={1}>{this.state.reviews[1]}</Slide>
              <Slide index={2}>{this.state.reviews[2]}</Slide>
            </Slider>
            <ButtonBack>{"<<"}</ButtonBack>
            <ButtonNext>>></ButtonNext>
          </CarouselProvider>
        </div>
      </div>
    );
  }
}
