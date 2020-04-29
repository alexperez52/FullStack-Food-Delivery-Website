import React, { Component } from "react";
import axios from "axios";
import history from "../history";
import { Link, Route } from "react-router-dom";
import CreateRestaurantTool from "./CreateRestaurantTool";
import AddItemsTool from "./AddItemsTool";
import DisplayItemsTool from "./DisplayItemsTool";

export default class OwnerPageTool extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stat: ""
    };
  }

  componentDidMount() {
    axios.get("/owner").then(response => {
      const res = response.data;
      this.setState({ stat: res });
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
        <button onClick={this.createClicked}>
          {this.state.stat ? (
            <label>Edit Restaurant</label>
          ) : (
            <label>Create Restaurant</label>
          )}
        </button>
        <button onClick={this.addClicked}>add items</button>
        <button onClick={this.viewClicked}>view items</button>

        <hr></hr>
        <Route
          exact
          path="/owner/restaurants"
          component={CreateRestaurantTool}
        />

        <Route path="/owner/restaurants/add" component={AddItemsTool} />

        <hr />

        <Route
          exact
          path="/owner/restaurants/add/view"
          component={DisplayItemsTool}
        />
      </div>
    );
  }
}
