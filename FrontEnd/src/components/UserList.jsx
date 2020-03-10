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
    axios.get("/test")
      .then(res => {
        const posts = res.data;
        this.setState({ posts });
      });
  }


  render() {
    return (
       <div>
               {this.state.posts.username}
            </div>
    );

  }

}