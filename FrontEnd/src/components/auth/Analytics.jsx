import React, { Component } from "react";
import GlobalContext from "/home/alexis/Desktop/Kitchen-Delivery/FrontEnd/src/components/auth/userContext.js";
import axios from "axios";

export default class Analytics extends Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      orders: [],
      totalPrice: 0,
    };
  }

  async componentDidMount() {
    await axios.get("/specificInvoices").then((e) => {
      console.log(e);

      this.setState({ posts: e.data });
      let totalPrice = 0;
      for (var i = 0; i < e.data.length; i++) {
        totalPrice += e.data[i].bill;
      }
      this.setState({ totalPrice });
    });

    await axios.get();
  }

  render() {
    return (
      <div>
        {this.context.currentUser === "OWNER" && (
          <div className="owner-container back">
            <h1 className="owner-banner ">All Orders</h1>
            <div className="invoice-item1 color-owner">
              Total Earnings:{" "}
              <div className="color-green"> ${this.state.totalPrice}</div>
            </div>
            <div className="background">
              {this.state.posts.map((postDetail, index) => {
                return (
                  <div key={postDetail.id} className="owner-items">
                    <div
                      className="invoice-item dropdown sizing"
                      key={postDetail}
                      onClick={() => this.invoiceClicked(postDetail.id)}
                    >
                      <div>
                        <div className="">
                          User: {postDetail.user.username} | Date:{" "}
                          {postDetail.date} | In progress:{" "}
                          {postDetail.inProgress.toString()} | Complete:{" "}
                          {postDetail.complete.toString()} | Total Price:{" "}
                          {postDetail.bill}
                        </div>
                      </div>
                      <div className="dropdown-content dropdown-size">
                        {" "}
                        <div>ok</div>
                        <div>{postDetail.information}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {this.context.currentUser === "DRIVER" && <label>DRIVER</label>}
      </div>
    );
  }
}
