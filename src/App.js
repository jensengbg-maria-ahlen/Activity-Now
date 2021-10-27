// @ts-nocheck
import logo from './assets/logo.png';
import info from './assets/info.png';
import './Styles/_app.scss';
import { useState } from "react";

function App() {
  const [isShown, setIsShown] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div className="toggleDiv" onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}>
          <img className="info" src={info} alt="info" />
          {isShown && (
            <p className="toggle">
              Activity Today has no responsiblities for stuff that happens on activities <br /> here is more info
            </p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
