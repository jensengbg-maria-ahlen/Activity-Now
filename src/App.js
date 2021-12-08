// @ts-nocheck
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { Authentication } from "./hooks/authentication"
import { PrivateRoute, SettingRoute } from "./hooks/PrivateRoute";

import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/footer";
import Login from "./views/Auth/login"
import Singup from "./views/Auth/signup"
import ForgotPassword from "./views/Auth/forgot-password"
import Home from "./views/HomePage/home"
import Profile from "./views/Profile/profile";
import PasswordChange from "./views/Profile/passwordChange";
import UserForgotPassword from "./views/Profile/userForgotPassword";
import RemoveAccount from "./views/Profile/removeAccount";
import CalendarView from "./views/Calendar/calendar";
import NewActivity from "./Components/Activities/newActivity"
import EditActivity from "./Components/Activities/editActivity"
import ChosenActivity from "./Components/Activities/chosenActivity";
import YourActivities from "./views/YourActivities/yourActivities";
import NotFound from "./views/404/404";
import Location from "./views/Location";

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
            <SettingRoute exact path="/profile/changepassword" component={PasswordChange} />
            <SettingRoute exact path="/forgotpassword" component={UserForgotPassword} />
            <PrivateRoute exact path="/removeaccount" component={RemoveAccount} />
            <PrivateRoute exact path="/calendar" component={CalendarView} />
            <PrivateRoute exact path="/createactivity" component={NewActivity} />
            <PrivateRoute exact path="/edit/:id" component={EditActivity} />
            <PrivateRoute exact path="/chosen/:id" component={ChosenActivity} />
            <PrivateRoute exact path="/youractivities" component={YourActivities} />
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
