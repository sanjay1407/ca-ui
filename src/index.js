import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Products from "./Products";
import Header from "./Header";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Compare from "./Compare";
const routing = (
  <Router>
    <Switch>
      <Route exact path="/">
        <>
          <Header />
          <App />
        </>
      </Route>
      <Route path="/products">
        <>
          <Header />
          <Products />
        </>
      </Route>
      <Route path="/compare">
        <>
          <Header />
          <Compare />
        </>
      </Route>
    </Switch>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));

serviceWorker.unregister();
