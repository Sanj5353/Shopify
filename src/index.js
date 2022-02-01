import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker.js"//' `../serviceWorker.js`;
//import registerServiceWorker from 'react-service-worker';
import { subscribeUser } from './subscribe';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
 
//serviceWorker.register();

//subscribeUser();
