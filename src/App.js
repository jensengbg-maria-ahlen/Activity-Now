// @ts-nocheck
import logo from './assets/logo.png';
import './Styles/_app.scss';
import LoginView from "../src/views/login-view"
import SingupView from "../src/views/signup-view"


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <LoginView/>
      <SingupView />
    </div>
  );
}

export default App;
