import React, { Component } from 'react';
import Registration from './components/Registration';
import { Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Error from "./components/Error";
import Login from "./components/LoginTool";
import Navigation from "./components/Navigation";
import './App.css';
import history from "./components/history"
import LoginSuccess from './components/LoginSuccess';
import LoginFail from './components/LoginFail';


class App extends Component {
  render() {
    return (

      <div className="App__Form">
        
        
        <Navigation />
          <Router history={history}>
          
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
