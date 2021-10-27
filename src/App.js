// @ts-nocheck
import logo from './assets/logo.png';
import './Styles/_app.scss';
import { useState } from "react";

function App() {
  const [isShown, setIsShown] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="toggleDiv" onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}>
          <img className="info" src="./assets/info.png" alt="info" />
          {isShown && (
            <p className="toggle">
              Piktro is a website for you who want to do retrospectives in <br /> a simple way on one spot where all your information is stored.
            </p>
          )}
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
