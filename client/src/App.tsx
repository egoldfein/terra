import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import Home from "./Pages/Home/Home";
import Search from "./Pages/Search/Search";
import Plant from "./Pages/Plant/Plant";
import Header from "./Components/Header/Header";
import { Grid } from "@material-ui/core";

const history = createBrowserHistory();

function App() {
  return (
    <div>
      <Header />
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/plant/:id" render={(props) => <Plant {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
