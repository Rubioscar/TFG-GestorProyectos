import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { Router } from "react-router";
import history from "./common/helper/history";
import store from "./store";
import App from "./App";
// import * as serviceWorker from '../public/serviceWorker/serviceWorker';
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
