import React, { Component } from "react";
import axios from "axios";
import history from "../history";
import Dialog from "./Dialog";

export default class DisplayRestaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      showItems: 6
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  async componentDidMount() {
    await axios.get("/restaurants").then(res => {
      const posts = res.data;
      this.setState({ posts });
    });
  }

  render() {
    var items = this.state.posts.slice(0, 6);
    return (
      <div>
      <div className="item-gap">
        {items.map((postDetail, index) => {
          return (
            <div  key={postDetail.id} > 
            <button className ="wrap-gap" key={postDetail.id} >
              <img className="small-pic" src={postDetail.imageURL}></img>
              <div>
            <div className="restaurant-label">
              {" "}
              {postDetail.restaurantName}
              
            </div>
            <div className="description-label">
            Ratings: {postDetail.ratings}
            </div>
            <div className="description-label">
              {postDetail.category}
            </div>
            </div>
            </button>
            </div>
            
          );
        })}
      </div>
    </div>
    );
    
  }
}
