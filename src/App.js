import React from "react";
import "./styles.css";
import Menu from "./components/Nav";
import Home from "./pages/home";
import Stocks from "./pages/stocks";
import Quote from "./pages/quote";
import PriceHistory from "./pages/pricehistory";
import { Login } from "./pages/login";
import { Register } from "./pages/register";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";

import SearchByIndustry from "./views/SearchIndustry";
import SearchBySymbol from "./views/SearchSymbol";
import SearchTimeframe from "./views/SearchTimeframe";




export default function App(search) {

  // // const { loading, stockData, error } = useAPI(search);
  // if (loading) {
  //   return <p>Loading site...</p>;
  // }
  // if (error) {
  //   return <p>Something went wrong: {error.message}</p>;
  // }
  return (
    
  
    <Router>
      <div className="App">
        <Menu />
         <Switch>
          <Route exact path="/">
            <Home />
            
            <SearchByIndustry />
      
          </Route>
            <Route path="/stocks">
              <Stocks />
            </Route>
            <Route path="/quote">
              <Quote />
              <SearchBySymbol />
            </Route>
            <Route path="/pricehistory">
              <PriceHistory />
              <SearchTimeframe />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
        </Switch>
      </div>
    </Router>
  );
}
