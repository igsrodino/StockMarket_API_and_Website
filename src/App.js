import React from "react";
import "./styles.css";
// import { Navbar, Nav } from 'react-bootstrap';
import Menu from "./components/Nav";
import Home from "./pages/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Stocks from "./pages/stocks";
// import Header from "./components/Header.jsx";
// import {Nav, Navbar} from 'react-bootstrap/Navbar'

export default function App() {
  return (
    <Router>
      <div className="App">
        <Menu />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/stocks">
            <Stocks />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
