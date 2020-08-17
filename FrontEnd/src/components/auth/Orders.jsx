import React, { Component } from "react";
import axios from "axios";
import SmallerDialog from "./SmallerDialog";

export default class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      accepted: false,
      completed: false,
      something: false,
    };

    this.acceptOrder = this.acceptOrder.bind(this);
  }

  componentDidMount() {
    axios.get("/orders").then((e) => {
      this.setState({ posts: e.data });
      console.log(e);
    });
  }

  async acceptOrder(e) {
    const data = {
      id: e,
    };

    await axios.put("/acceptOrder", data).then((re) => {
      console.log(re);
    });

    this.setState({ accepted: true });
    console.log(e);
  }

  async completeOrder(e, earnings) {
    const data = {
      id: e,
    };

    await axios.put("/completeOrder", data).then((re) => {
      console.log(re);
    });

    await this.setState({ completed: true });

    const payAmount = {
      earnings: earnings * 0.1,
    };

    await axios.put("/payUser", payAmount);
  }

  render() {
    return (
      <div>
        <SmallerDialog
          isOpen={this.state.accepted}
          onClose={(e) => this.setState({ accepted: false })}
        >
          <div>Order Accepted !</div>
          <div>
            <button
              onClick={(e) => window.location.reload()}
              className="dialog-button"
            >
              OK
            </button>{" "}
          </div>
        </SmallerDialog>

        <SmallerDialog
          isOpen={this.state.completed}
          onClose={(e) => this.setState({ completed: false })}
        >
          <div>Order Complete !</div>
          <div>
            <button
              onClick={(e) => window.location.reload()}
              className="dialog-button"
            >
              OK
            </button>{" "}
          </div>
        </SmallerDialog>
        <div className="align-circles">
          <h1>All Orders</h1>
        </div>
        <div className="background">
          {this.state.posts.map((postDetail, index) => {
            return (
              <div key={index} className="owner-items">
                <div className="invoice-item dropdown sizing" key={index}>
                  <div>
                    <div>
                      User: {postDetail.user.username} | Date: {postDetail.date}{" "}
                      Total Price: {postDetail.bill} | Status:{" "}
                      {postDetail.inProgress === true && (
                        <label className="in-progress">In Progress</label>
                      )}
                      {postDetail.inProgress === false &&
                        postDetail.complete === false && (
                          <label className="pending">Pending</label>
                        )}{" "}
                    </div>
                  </div>

                  <div className="dropdown-content dropdown-size">
                    {postDetail.information}
                  </div>
                </div>

                <button
                  className="order-button"
                  key={postDetail.id}
                  onClick={(e) => this.acceptOrder(postDetail.id)}
                >
                  Accept Order
                </button>
                <button
                  className="order-button red-btn"
                  onClick={(e) =>
                    this.completeOrder(postDetail.id, postDetail.bill)
                  }
                >
                  Complete Order
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
