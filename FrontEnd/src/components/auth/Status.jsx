import React, { Component } from "react";
import GlobalContext from "/home/alexis/Desktop/Kitchen-Delivery/FrontEnd/src/components/auth/userContext.js";
import axios from "axios";
import Check from "/home/alexis/Desktop/Kitchen-Delivery/FrontEnd/src/components/images/check.png";

export default class Status extends Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);
    this.state = {
      inProgress: false,
      completed: false,
      bill: 0,
    };
  }

  async componentDidMount() {
    axios.get("/userInvoices").then((e) => {
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
      console.log(latestInvoice);

      this.setState({
        inProgress: latestInvoice.inProgress,
        completed: latestInvoice.complete,
        bill: latestInvoice.bill,
      });

      console.log(this.state);
    });
  }

  render() {
    return (
      <div>
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
            </div>
          )}
          {this.state.completed === false && (
            <div>
              <div className="circle "></div>
              <div className="bigger-text">Complete</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
