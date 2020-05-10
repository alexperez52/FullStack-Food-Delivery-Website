import React, { Component } from "react";
import GlobalContext from "/home/alexis/Desktop/Kitchen-Delivery/FrontEnd/src/components/auth/userContext.js";
import axios from "axios";

export default class Analytics extends Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      totalPrice: 0,
      earnings: 0,
    };
  }

  async componentDidMount() {
    await axios.get("/specificInvoices").then((e) => {
      console.log(e);

      this.setState({ posts: e.data });
      let totalPrice = 0;
      const arr = [];
      for (var i = 0; i < e.data.length; i++) {
        totalPrice += e.data[i].bill;
      }
      this.setState({ totalPrice, items: arr });
    });

    await axios.get("/currentUser").then((e) => {
      console.log(e.data.earnings);
      this.setState({ earnings: e.data.earnings });
    });
  }

  render() {
    return (
      <div>
        {this.context.currentUser === "OWNER" && (
          <div className="owner-container back">
            <h1 className="owner-banner ">All Orders</h1>
            <div className="invoice-item1 color-owner">
              Total Earnings:{" "}
              <div className="color-green">
                {" "}
                ${Math.round(this.state.totalPrice * 100) / 100}
              </div>
            </div>
            <div className="background">
              {this.state.posts.map((postDetail, index) => {
                return (
                  <div key={index} className="owner-items">
                    <div className="invoice-item dropdown sizing" key={index}>
                      <div>
                        <div className="">
                          User: {postDetail.user.username} | Date:{" "}
                          {postDetail.date} | Status:{" "}
                          {postDetail.inProgress === false &&
                            postDetail.complete === false && (
                              <label className="pending">Pending</label>
                            )}{" "}
                          {postDetail.complete === false &&
                            postDetail.inProgress === true && (
                              <label className="in-progress">In Progress</label>
                            )}{" "}
                          {postDetail.complete === true && (
                            <label className="complete">Complete</label>
                          )}{" "}
                          {postDetail.bill}
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
        )}

        {this.context.currentUser === "DRIVER" && (
          <div className="owner-container back">
            <h1 className="owner-banner ">Order Overview</h1>
            <div className="invoice-item1 color-owner">
              Total Earnings:{" "}
              <div className="color-green">
                {" "}
                ${Math.round(this.state.earnings * 100) / 100}
              </div>
            </div>
            <div className="background">
              {this.state.posts.map((postDetail, index) => {
                return (
                  <div key={index} className="owner-items">
                    <div
                      className="invoice-item dropdown sizing"
                      key={index}
                      onClick={() => this.invoiceClicked(postDetail.id)}
                    >
                      <div>
                        <div className="">
                          User: {postDetail.user.username} | Date:{" "}
                          {postDetail.date} | Status:{" "}
                          {postDetail.inProgress === false &&
                            postDetail.complete === false && (
                              <label className="pending">Pending</label>
                            )}{" "}
                          {postDetail.complete === false &&
                            postDetail.inProgress === true && (
                              <label className="in-progress">In Progress</label>
                            )}{" "}
                          {postDetail.complete === true && (
                            <label className="complete">Complete</label>
                          )}{" "}
                          {postDetail.bill}
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
        )}
      </div>
    );
  }
}
