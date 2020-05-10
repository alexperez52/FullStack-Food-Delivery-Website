import React, { Component } from "react";
import axios from "axios";
import history from "../history";
import Dialog from "./Dialog";
import StarRatings from "react-star-ratings";

export default class DisplayRestaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      showItems: 6,
    };
  }

  async componentDidMount() {
    await axios.get("/restaurants").then((res) => {
      const posts = res.data;
      this.setState({ posts });
    });
  }

  restaurantClicked(e) {
    history.replace("/restaurant/" + e);
    console.log(e);
  }

  render() {
    var items = this.state.posts.slice(0, 6);
    return (
      <div>
        <div className="item-gap">
          {items.map((postDetail, index) => {
            return (
              <div key={postDetail.id}>
                <button
                  key={postDetail}
                  className="wrap-gap"
                  onClick={() => this.restaurantClicked(postDetail.id)}
                >
                  <img className="small-pic" src={postDetail.imageURL}></img>
                  <div>
                    <div className="restaurant-label">
                      {" "}
                      {postDetail.restaurantName}
                    </div>
                    <div className="description-label">
                      Ratings:{" "}
                      <StarRatings
                        rating={postDetail.ratings || 0}
                        starRatedColor="#fcb002"
                        numberOfStars={5}
                        starDimension="15px"
                        starSpacing="1px"
                        name="rating"
                      />
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
