// @ts-nocheck
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { Authentication } from "./hooks/authentication"
import { PrivateRoute } from "./Components/PrivateRoute";

import NavBar from "./Components/NavBar/NavBar";
import LoginView from "../src/views/login-view"
import SingupView from "../src/views/signup-view"
import ForgotPasswordPage from "./views/forgot-password-view"
import LandingView from "../src/views/landing-view"
import ProfileView from "./views/profile-view"
import CalendarView from "./views/calendar-view"
import NewActivityView from "./views/newActivity-view"
import EditView from "./views/editActivity-view"
import YourActivities from "./views/yourActivities"
import NotFound from "./views/404"
import Location from './views/Location'

import logo from './assets/logo.png';
import './Styles/_app.scss';

function App() {
  return (
    <div className="app">
      <Router>
        <Authentication>
          <header className="app__header">
            <Link to="/">
              <img src={logo} className="app__logo" alt="logo" />
            </Link>
            <PrivateRoute component={NavBar}/>
            
          </header>
          <Switch>
            <Route exact path="/login" component={LoginView} />
            <Route exact path="/signup" component={SingupView} />
            <Route exact path="/forgot" component={ForgotPasswordPage} />

            <PrivateRoute exact path="/" component={LandingView} />
            <PrivateRoute exact path="/profile" component={ProfileView} />
            <PrivateRoute exact path="/calendar" component={CalendarView} />
            <PrivateRoute exact path="/createactivity" component={NewActivityView} />
            <PrivateRoute exact path="/edit/:id" component={EditView} />
            <PrivateRoute exact path="/youractivities" component={YourActivities} />
            <Route exact path="/location" component={Location} />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </Authentication>
      </Router>
    </div>
  );
}

export default App;
