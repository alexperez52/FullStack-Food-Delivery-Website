import React, { Component } from 'react';
import Registration from './components/auth/Registration';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Error from "./components/auth/Error";
import Login from "./components/auth/LoginTool";
import './App.css';
import history from "./components/history"
import LoginSuccess from './components/auth/LoginSuccess';
import LoginFail from './components/auth/LoginFail';
import Header from './components/Header';
import Headroom from 'react-headroom';
import CreateRestaurant from './components/auth/CreateRestaurantTool';
import AddItems from "./components/auth/AddItemsTool";
import OwnerPage from "./components/auth/OwnerPageTool";
import RestaurantPage from './components/auth/RestaurantPage';
import axios from 'axios';
import HoverHead from './components/auth/HoverHead';
import Account from './components/auth/Account';
import Analytics from "./components/auth/Analytics.jsx"
import Orders from './components/auth/Orders.jsx';
import Status from './components/auth/Status';
import AllRestaurants from './components/auth/AllRestaurants';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      role: ""
    };
  }

  async componentDidMount() {

    await axios.get("/currentUser").then(e => {
      this.setState({ userName: e.data.username });

    })
  }


  render() {


    history.listen((location, action) => {
      window.scrollTo(0, 0);
    });

    return (


      <div>


        <Router history={history}>
          <Headroom>
            <Header />
          </Headroom>
          <Switch>
            <Route path="/restaurants" component={AllRestaurants} />
            <Route path="/status" component={Status} />
            <Route path="/orders" component={Orders} />
            <Route path="/analytics" component={Analytics} />
            <Route path="/account" component={Account} />
            <Route path="/push" component={HoverHead} />
            <Route path="/restaurant/*" component={RestaurantPage} />
            <Route path="/owner" component={OwnerPage} />

            <Route path="/" component={Home} exact />
            <Route path="/registration" component={Registration} />
            <Route path="/login" component={Login} />
            <Route path="/LoginSuccess" component={LoginSuccess} />
            <Route path="/LoginFail" component={LoginFail} />
            <Route exact path="/owner/restaurants" component={CreateRestaurant} />
            {/* <Route exact path= "/owner/restaurants/view" component={DisplayItems} />  */}
            <Route exact path="/owner/restaurants/add" component={AddItems} />
            <Route component={Error} />
          </Switch>
        </Router>
      </div >

    );
  }
}
export default App;

