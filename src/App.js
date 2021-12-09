// @ts-nocheck
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { Authentication } from "./hooks/authentication"
import { PrivateRoute } from "./hooks/PrivateRoute";

import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/footer";
import Login from "./views/Auth/login"
import Singup from "./views/Auth/signup"
import ForgotPassword from "./views/Auth/forgot-password"
import Home from "./views/HomePage/home"
import Profile from "./views/Profile/profile"
import CalendarView from "./views/Calendar/calendar";
import NewActivity from "./Components/Activities/newActivity"
import EditActivity from "./Components/Activities/editActivity"
import ChosenActivity from "./Components/Activities/chosenActivity";
import YourActivities from "./views/YourActivities/yourActivities"
import NotFound from "./views/404/404"
import Location from "./views/Location";
import Cookies from "./views/Cookie/cookies"
import About from "./views/About/about"

import logo from './assets/logo.png';
import './Styles/_app.scss';


function App() {
  return (
    <div className="app" id="app">
      <Router>
        <Authentication>
          <header className="app__header">
            <Link to="/">
              <img src={logo} className="app__logo" alt="logo" />
            </Link>
            <PrivateRoute component={NavBar}/>
          </header>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Singup} />
            <Route exact path="/forgot" component={ForgotPassword} />

            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/calendar" component={CalendarView} />
            <PrivateRoute exact path="/createactivity" component={NewActivity} />
            <PrivateRoute exact path="/edit/:id" component={EditActivity} />
            <PrivateRoute exact path="/chosen/:id" component={ChosenActivity} />
            <PrivateRoute exact path="/youractivities" component={YourActivities} />
            <PrivateRoute exact path="/cookie" component={Cookies} />
            <PrivateRoute exact path="/aboutus" component={About} />
            <Route exact path="/location" component={Location} />
            <Route exact path="*" component={NotFound} />
          </Switch>
          <footer>
            <PrivateRoute component={Footer} />
          </footer>
        </Authentication>
      </Router>
    </div>
  );
}

export default App;
