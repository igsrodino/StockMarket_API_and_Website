import React from "react";
import "./styles.css";
// import { Navbar, Nav } from 'react-bootstrap';
import Menu from "./components/Nav";
import Home from "./pages/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Stocks from "./pages/stocks";
import { useAPI, Headline } from "./api";
// import Header from "./components/Header.jsx";
// import {Nav, Navbar} from 'react-bootstrap/Navbar'

export default function App() {
  const { loading, stockData, error } = useAPI();
  if (loading) {
    return <p>Loading site...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <Router>
      <div className="App">
        <Menu />
        {stockData.map(stocks => (
          <Headline name={stocks.name} symbol={stocks.symbol} industry={stocks.industry} />
        ))}

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
