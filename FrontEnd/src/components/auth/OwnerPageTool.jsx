import React, { Component } from "react";
import axios from "axios";
import history from "../history";
import { Link, Route } from "react-router-dom";
import CreateRestaurantTool from "./CreateRestaurantTool";
import AddItemsTool from "./AddItemsTool";
import DisplayItemsTool from "./DisplayItemsTool";
import GlobalContext from "/home/alexis/Desktop/Kitchen-Delivery/FrontEnd/src/components/auth/userContext.js";
import { Redirect } from "react-router-dom";

export default class OwnerPageTool extends Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);

    this.state = {
      stat: "",
      posts: [],
    };
    this.addClicked = this.addClicked.bind(this);
    this.createClicked = this.createClicked.bind(this);
    this.viewClicked = this.viewClicked.bind(this);
  }

  async componentDidMount() {
    axios.get("/owner").then((response) => {
      const res = response.data;
      this.setState({ stat: res });
    });
    await axios.get("/restaurants").then((res) => {
      const posts = res.data;
      this.setState({ posts });
    });
  }
  addClicked() {
    history.replace("/owner/restaurants/add");
  }

  createClicked() {
    history.replace("/owner/restaurants");
  }

  viewClicked() {
    history.replace("/owner/restaurants/add/view");
  }

  render() {
    return (
      <div>
        <div className="dark enlarge button-bar">
          <button onClick={this.createClicked} className="owner-btn">
            {this.state.stat ? (
              <label>Edit Restaurant</label>
            ) : (
              <label>Create Restaurant</label>
            )}
          </button>
          <button onClick={(e) => this.addClicked()} className="owner-btn">
            add items
          </button>
          <button onClick={(e) => this.viewClicked()} className="owner-btn">
            view items
          </button>
        </div>
        <Route
          exact
          path="/owner/restaurants"
          component={CreateRestaurantTool}
        />
        <Route path="/owner/restaurants/add" component={AddItemsTool} />
        <Route
          exact
          path="/owner/restaurants/add/view"
          component={DisplayItemsTool}
        />
      </div>
    );
  }
}
