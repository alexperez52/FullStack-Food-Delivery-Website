import React, { Component } from "react";
import GlobalContext from "/home/alexis/Desktop/Kitchen-Delivery/FrontEnd/src/components/auth/userContext.js";
import axios from "axios";
import Check from "/home/alexis/Desktop/Kitchen-Delivery/FrontEnd/src/components/images/check.png";
import history from "/home/alexis/Desktop/Kitchen-Delivery/FrontEnd/src/components/history.jsx";
import SmallerDialog from "./SmallerDialog";

export default class Status extends Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);
    this.state = {
      confirmed: false,
      inProgress: false,
      completed: false,
      bill: 0,
      posts: [],
      ratings: 0,
      reviewSent: false,
      latestInvoice: {
        bill: "",
        complete: false,
        date: "",
        id: "",
        inProgress: "",
        information: "",
        rawBill: "",
        restaurant: {
          id: "",
        },
      },
    };

    this.setRatings = this.setRatings.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  async componentDidMount() {
    await axios.get("/userInvoices").then((e) => {
      console.log(e);

      const idArray = [];

      for (var i = 0; i < e.data.length; i++) {
        idArray.push(e.data[i].id);
      }

      const newArr = idArray.sort();

      for (var i = 0; i < e.data.length; i++) {
        if (e.data[i].id === newArr[newArr.length - 1]) {
          var latestInvoice = e.data[i];
        }
      }

      try {
        this.setState({
          inProgress: latestInvoice.inProgress,
          completed: latestInvoice.complete,
          bill: latestInvoice.bill,
          posts: e.data,
          confirmed: true,
          latestInvoice: {
            bill: latestInvoice.bill,
            complete: latestInvoice.complete,
            date: latestInvoice.date,
            id: latestInvoice.id,
            inProgress: latestInvoice.inProgress,
            information: latestInvoice.information,
            rawBill: latestInvoice.rawBill,
            restaurant: {
              id: latestInvoice.restaurant.id,
            },
          },
        });
      } catch (err) {}
    });
    console.log(this.state.latestInvoice);
  }

  searchRestaurants() {
    history.replace("/restaurants");
  }

  async setRatings() {
    const data = {
      id: this.state.latestInvoice.restaurant.id,
      ratings: this.state.ratings,
      message: this.state.message,
    };

    await axios.post("/rate", data).then((e) => {
      console.log(data);
    });
    this.setState({ reviewSent: true });
  }

  render() {
    return (
      <div>
        {this.state.confirmed === false && (
          <div>
            <div className="align-circles bigger-text">
              <div>
                <h1>No orders yet</h1>
              </div>
            </div>
            <div className="align-circles">
              <button
                className="login-button bigger-text"
                onClick={(e) => {
                  this.searchRestaurants();
                }}
              >
                Place an order!
              </button>
            </div>
          </div>
        )}

        {this.state.confirmed === true && (
          <div>
            <div className="align-circles ">
              <label className="bigger-text">Current Order Status</label>
            </div>
            <div className="align-circles">
              <div>
                <div className="circle confirmed-circle">
                  <img className="check-size" src={Check}></img>
                </div>
                <div className="bigger-text">Confirmed</div>
              </div>
              <div>
                <hr className="hr confirmed-hr"></hr>
              </div>

              {this.state.inProgress === true && (
                <div>
                  <div className="circle confirmed-circle">
                    <img className="check-size" src={Check}></img>
                  </div>
                  <div className="bigger-text">In Progress</div>
                </div>
              )}
              {this.state.inProgress === false && (
                <div>
                  <div className="circle"></div>
                  <div className="bigger-text">In Progress</div>
                </div>
              )}

              {this.state.inProgress === true && (
                <div>
                  <hr className="hr confirmed-hr"></hr>
                </div>
              )}
              {this.state.inProgress === false && (
                <div>
                  <hr className="hr"></hr>
                </div>
              )}

              {this.state.completed === true && (
                <div>
                  <div className="circle confirmed-circle">
                    <img className="check-size" src={Check}></img>
                  </div>
                  <div className="bigger-text">Complete</div>
                  <div>
                    <SmallerDialog
                      isOpen={!this.state.reviewSent}
                      onClose={(e) => this.setState({ reviewSent: true })}
                    >
                      <div>Leave a Review !</div>
                      <div>
                        <textarea
                          className="text-area"
                          name="message"
                          value={this.state.message}
                          onChange={this.handleChange}
                        ></textarea>
                      </div>
                      <div className="rate">
                        <input
                          type="radio"
                          id="star5"
                          name="rate"
                          value="5"
                          onClick={(e) => {
                            this.setState({ ratings: 5 });
                          }}
                        />
                        <label for="star5" title="text">
                          5 stars
                        </label>
                        <input
                          type="radio"
                          id="star4"
                          name="rate"
                          value="4"
                          onClick={(e) => {
                            this.setState({ ratings: 4 });
                          }}
                        />
                        <label for="star4" title="text">
                          4 stars
                        </label>
                        <input
                          type="radio"
                          id="star3"
                          name="rate"
                          value="3"
                          onClick={(e) => {
                            this.setState({ ratings: 3 });
                          }}
                        />
                        <label for="star3" title="text">
                          3 stars
                        </label>
                        <input
                          type="radio"
                          id="star2"
                          name="rate"
                          value="2"
                          onClick={(e) => {
                            this.setState({ ratings: 2 });
                          }}
                        />
                        <label for="star2" title="text">
                          2 stars
                        </label>
                        <input
                          type="radio"
                          id="star1"
                          name="rate"
                          value="1"
                          onClick={(e) => {
                            this.setState({ ratings: 1 });
                          }}
                        />
                        <label for="star1" title="text">
                          1 star
                        </label>
                        <div>
                          <button
                            onClick={(e) => {
                              this.setRatings();
                            }}
                          >
                            Submit Review
                          </button>
                        </div>
                      </div>
                    </SmallerDialog>
                  </div>
                </div>
              )}
              {this.state.completed === false && (
                <div>
                  <div className="circle "></div>
                  <div className="bigger-text">Complete</div>
                </div>
              )}
            </div>
            <div className="invoice-item1 color-owner">
              <label className="bigger-text">All orders</label>
            </div>
            <div className="align-circles">
              <div className="background">
                {this.state.posts.map((postDetail, index) => {
                  return (
                    <div key={index} className="owner-items">
                      <div className="invoice-item dropdown sizing" key={index}>
                        <div>
                          <div className="">
                            Date: {postDetail.date} | Status:{" "}
                            {postDetail.inProgress === false &&
                              postDetail.complete === false && (
                                <label className="pending">Pending</label>
                              )}{" "}
                            {postDetail.complete === false &&
                              postDetail.inProgress === true && (
                                <label className="in-progress">
                                  In Progress
                                </label>
                              )}{" "}
                            {postDetail.complete === true && (
                              <label className="complete">Complete</label>
                            )}{" "}
                            | Bill: {postDetail.bill}
                          </div>
                        </div>

                        <div className="dropdown-content dropdown-size">
                          {postDetail.information}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
