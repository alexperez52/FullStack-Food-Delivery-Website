import React, { Component } from "react";
import axios from "axios";
import history from "../history";
import Dialog from "./Dialog";

export default class DisplayItemsTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isOpen: false,
      id: "",
      name: "",
      description: "",
      price: "",
      imageURL: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }
  editClick(e) {
    console.log(e);
    const data = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      imageURL: this.state.imageURL,
      updater: false,
    };

    axios.put("/items", data);
    window.location.reload();
  }

  async handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  async componentDidMount() {
    await axios.get("/items").then((res) => {
      const posts = res.data;
      this.setState({ posts });
    });
  }

  async deleteClick(e) {
    const data = {
      id: e,
    };

    await axios.put("/owner/restaurants/add", data);
    history.replace("/owner/restaurants/add");

    history.replace("/owner/restaurants/add/view");
  }

  render() {
    return (
      <div className="item-wrap">
        {this.state.posts.map((postDetail, index) => {
          return (
            <div className="card" key={postDetail.id}>
              {" "}
              <label className="edit-label">{postDetail.name}</label>
              <img className="small-pic-card" src={postDetail.imageURL}></img>
              <button
                className="edit"
                onClick={(e) =>
                  this.setState({ isOpen: true, id: postDetail.id })
                }
              >
                Edit Item
              </button>
              <button
                className="delete"
                key={postDetail.id}
                onClick={() => this.deleteClick(postDetail.id)}
              >
                Delete Item
              </button>
              <Dialog
                isOpen={this.state.isOpen}
                onClose={(e) => this.setState({ isOpen: false })}
              >
                <div className="label-div">name</div>
                <div>
                  <input
                    className="input-input"
                    type="name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  ></input>
                </div>
                <div className="label-div">description</div>
                <div>
                  <input
                    className="input-input"
                    type="description"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                  ></input>
                </div>
                <div className="label-div">price</div>
                <div>
                  <input
                    className="input-input"
                    type="price"
                    name="price"
                    value={this.state.price}
                    onChange={this.handleChange}
                  ></input>
                </div>

                <div className="label-div">imageURL</div>
                <div>
                  <input
                    className="input-input"
                    type="imageURL"
                    name="imageURL"
                    value={this.state.imageURL}
                    onChange={this.handleChange}
                  ></input>
                </div>
                <button
                  className="login-button"
                  onClick={() => this.editClick(postDetail.id)}
                >
                  submit
                </button>
              </Dialog>
            </div>
          );
        })}
      </div>
    );
  }
}
