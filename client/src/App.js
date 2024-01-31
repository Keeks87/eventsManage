/*
Filename: App.js

Path: eventsManage/client/src/App.js

Code: JavaScript code for the App component of the client application (eventsManage) is
written in this file. This file contains the main content of the client application. The 
component renders a list of all available events, and allows users to add new events or
edit existing events. The App component is exported so that it can be used in other parts
of the client application.
*/

// Code dependencies
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import UserLogin from "./components/UserLogin";
import AdminLogin from "./components/AdminLogin";
import Signup from "./components/Signup";
import Manage from "./components/Manage";
import ManageAdd from "./components/ManageAdd";
import ManageEdit from "./components/ManageEdit";
import Find from "./components/Find";

// Import css file
import "./style.css";

// App component
function App() {
  return (
    <Router>
      <div>
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <h2 className="navbar-brand" href="/">
              Events Management System
            </h2>
            <div
              className="collapse navbar-collapse"
            >
              <div className="navbar-nav">
                <a className="nav-link" aria-current="page" href="/">
                  Home
                </a>
                <a className="nav-link" href="/user-login">
                  User Login
                </a>
                <a className="nav-link" href="/admin-login">
                  Admin Login
                </a>
                <a className="nav-link" href="/signup">
                  Sign Up
                </a>
                <a className="nav-link" href="/manage">
                  Manage
                </a>
                <a className="nav-link" href="/find">
                  Find
                </a>
              </div>
            </div>
          </div>
        </nav>
        {/* Main content */}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/user-login" component={UserLogin} />
          <Route path="/admin-login" component={AdminLogin} />
          <Route path="/signup" component={Signup} />
          <Route path="/manage" exact component={Manage} />
          <Route path="/manage/add" component={ManageAdd} />
          <Route path="/manage/edit/:id" component={ManageEdit} />
          <Route path="/find" component={Find} />
        </Switch>
      </div>
    </Router>
  );
}

// Export App
export default App;
