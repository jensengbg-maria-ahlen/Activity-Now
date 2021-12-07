// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom';
import PreLoader from "./Components/PreLoader/preLoader";
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration.js';
import { BreakpointProvider } from "./Components/Breakpoint/useBreakpoint";
import App from './App';
import './index.css';

const queries = {
  xsMax: '(max-width: 375px)',
  smMin: '(min-width: 375px)',
  smMax: '(max-width: 540px)',
  mdMin: '(min-width: 540px)',
  mdMax: '(max-width: 720px)',
  lgMin: '(min-width: 720px)',
  lgMax: '(max-width: 1020px)',
  xlMin: '(min-width: 1020px)'
}

ReactDOM.render(
  <React.StrictMode>
    <PreLoader />
    <BreakpointProvider queries={queries} >
      <App />
    </BreakpointProvider>
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
