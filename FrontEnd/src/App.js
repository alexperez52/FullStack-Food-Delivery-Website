import React, { Component } from 'react';
import Registration from './components/auth/Registration';
import { Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Error from "./components/auth/Error";
import Login from "./components/auth/LoginTool";
import Navigation from "./components/Navigation";
import './App.css';
import history from "./components/history"
import LoginSuccess from './components/auth/LoginSuccess';
import LoginFail from './components/auth/LoginFail';
import Header from './components/Header';
import Headroom from 'react-headroom';

class App extends Component {
  

  render() {
    
    return (

          <div>
            <Router history={history}>
          <Headroom>
            <Header />
          </Headroom>
       
            
          
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/registration" component={Registration} />
              <Route path="/login" component={Login} />
              <Route path="/LoginSuccess" component={LoginSuccess} />
              <Route path="/LoginFail" component={LoginFail} />
              <Route component={Error} />
            </Switch>
          </Router>
          </div>
      
    );
  }
}
export default App;

