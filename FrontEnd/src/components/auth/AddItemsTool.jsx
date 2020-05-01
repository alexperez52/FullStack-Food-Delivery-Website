import React, { Component } from "react";
import axios from "axios";
import history from "../history";

export default class AddItemsTool extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      price: "",
      imageURL: "",
      posts: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    await axios.get("/items").then((res) => {
      const posts = res.data;
      this.setState({ posts });
    });
    console.log(this.state.posts);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  clicked() {
    const data = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      imageURL: this.state.imageURL,
    };

    axios.post("/owner/restaurants/add", data).then((response) => {
      history.replace("/owner/restaurants/add/view");
      history.replace("/owner/restaurants/add");
      history.replace("/owner/restaurants/add/view");

      console.log(response);
    });

    this.setState({
      name: data.name,
      description: data.description,
      price: data.price,
      imageURL: data.imageURL,
    });
  }

  render() {
    return (
      <div>
        <div>
          <input
            type="name"
            name="name"
            value={this.state.name}
            placeholder="name"
            onChange={this.handleChange}
          ></input>
        </div>
        <div>
          <input
            type="description"
            name="description"
            value={this.state.description}
            placeholder="description"
            onChange={this.handleChange}
          ></input>
        </div>
        <div>
          <input
            type="price"
            name="price"
            value={this.state.price}
            placeholder="price"
            onChange={this.handleChange}
          ></input>
        </div>
        <div>
          <input
            type="imageURL"
            name="imageURL"
            value={this.state.imageURL}
            placeholder="url"
            onChange={this.handleChange}
          ></input>
          <button onClick={(e) => this.clicked()}>add itemss</button>
        </div>
      </div>
    );
  }
}
