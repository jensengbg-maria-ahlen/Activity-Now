// @ts-nocheck
import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { Authentication } from "./hooks/authentication"
import { PrivateRoute, SettingRoute } from "./hooks/PrivateRoute";
import logo from './assets/logo.png';
import './Styles/_app.scss';

const NavBar = React.lazy(() => import("./Components/NavBar/NavBar"));
const Footer = React.lazy(() => import("./Components/Footer/footer"));
const Login = React.lazy(() => import("./views/Auth/login"));
const Singup = React.lazy(() => import("./views/Auth/signup"));
const ForgotPassword = React.lazy(() => import("./views/Auth/forgot-password"));
const Home = React.lazy(() => import("./views/HomePage/home"));
const Profile = React.lazy(() => import("./views/Profile/profile"));
const PasswordChange = React.lazy(() => import("./views/Profile/passwordChange"));
const UserForgotPassword = React.lazy(() => import("./views/Profile/userForgotPassword"));
const RemoveAccount = React.lazy(() => import("./views/Profile/removeAccount"));
const CalendarView = React.lazy(() => import("./views/Calendar/calendar"));
const NewActivity = React.lazy(() => import("./Components/Activities/newActivity"));
const EditActivity = React.lazy(() => import("./Components/Activities/editActivity"));
const ChosenActivity = React.lazy(() => import("./Components/Activities/chosenActivity"));
const YourActivities = React.lazy(() => import("./views/YourActivities/yourActivities"));
const NotFound = React.lazy(() => import("./views/404/404"));
const Cookies = React.lazy(() => import("./views/Cookie/cookies"));
const About = React.lazy(() => import("./views/About/about"));

function App() {
  return (
    <div className="app" id="app">
      <Suspense>
        <Router>
          <Authentication>
            <header className="app__header">
              <Link to="/">
                <img src={logo} className="app__logo" alt="logo" />
              </Link>
              <PrivateRoute component={NavBar} />
            </header>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Singup} />
              <Route exact path="/forgot" component={ForgotPassword} />
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/cookie" component={Cookies} />
              <PrivateRoute exact path="/aboutus" component={About} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <SettingRoute exact path="/profile/changepassword" component={PasswordChange} />
              <SettingRoute exact path="/forgotpassword" component={UserForgotPassword} />
              <PrivateRoute exact path="/removeaccount" component={RemoveAccount} />
              <PrivateRoute exact path="/calendar" component={CalendarView} />
              <PrivateRoute exact path="/createactivity" component={NewActivity} />
              <PrivateRoute exact path="/edit/:id" component={EditActivity} />
              <PrivateRoute exact path="/chosen/:id" component={ChosenActivity} />
              <PrivateRoute exact path="/youractivities" component={YourActivities} />
              <Route exact path="*" component={NotFound} />
            </Switch>
            <footer>
              <PrivateRoute component={Footer} />
            </footer>
          </Authentication>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
