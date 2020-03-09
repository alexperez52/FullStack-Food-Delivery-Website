import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";


export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios.get("/users")
      .then(res => {
        const posts = res.data.map(obj => ({title: obj.userName, overview: obj.password}));
        this.setState({ posts });
      });
  }


  render() {
    return (
      <ul>
        {this.state.posts.map(function(post, index){
          return (
              <div key={index}>
                <h1> User name: {" "} {post.title}</h1>
          <p>Password: {" "}{post.overview}</p>
              </div>
            )
          }
        )}
      </ul>
    );

  }

}