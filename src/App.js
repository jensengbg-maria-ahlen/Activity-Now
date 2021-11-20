
import logo from './assets/logo.png';
import './Styles/_app.scss';
import LoginView from "../src/views/login-view"
import SingupView from "../src/views/signup-view"
import LandingView from "../src/views/landing-view"
import ProfileView from "./views/profile-view"
import CalendarView from "./views/calendar-view"
import NewActivityView from "./views/newActivity-view"
import EditView from "./views/editActivity-view"
import YourActivities from "./views/yourActivities"
import ForgotPasswordPage from "./views/forgotpwd"
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from "react-router-dom"
import { useAuth } from './contexts/authContext'


function App() {
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('.../sw.js ')
    .then( (reg) => console.log('service worker registered', reg))
    .catch( (err) => console.log('service worker not registered', err))
}
  return (
    <div className="app">
      <header className="app__header">
        <img src={logo} className="app__logo" alt="logo" />
      </header>
      <Router>
        <Switch>
          <Route exact path="/signup" component={SingupView}/>
          <Route exact path="/"  component={LoginView}/>
          <Route exact path="/landing" component={LandingView}/>
          <Route exact path="/profile" component={ProfileView}/>
          <Route exact path="/calendar" component={CalendarView}/>
          <Route exact path="/createactivity" component={NewActivityView}/>
          <Route exact path="/edit" component={EditView}/>
          <Route exact path="/youractivities" component={YourActivities} />
          <Route exact path="/p" component={ForgotPasswordPage} />
        </Switch>
      </Router>
    </div>
  );
}




export default App;
