// @ts-nocheck
import logo from './assets/logo.png';
import './Styles/_app.scss';
import LoginView from "../src/views/login-view"
import SingupView from "../src/views/signup-view"
import LandingView from "../src/views/landing-view"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Router>
        <Switch>
          <Route path="/signup" component={SingupView}/>
          <Route path="/" exact component={LoginView}/>
          <Route path="/landing" component={LandingView}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
