// @ts-nocheck
import { useState } from "react";
export const Login = () => {

    const [isShown, setIsShown] = useState(false);

    <div className="toggleDiv" onMouseEnter={() => setIsShown(true)}
    onMouseLeave={() => setIsShown(false)}>
    <img className="info" src="./assets/logo.png" alt="info" />
    {isShown && (
      <p className="toggle">
        Activity Today has no responsiblities for stuff that happens on activities <br /> here is more info
      </p>
    )}
  </div>
};