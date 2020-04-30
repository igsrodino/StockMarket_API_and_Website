import React from "react";
import "./styles.css";
import Menu from "./components/Nav";
import Home from "./pages/home";
import Quote from "./pages/quote";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Stocks from "./pages/stocks";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import { Login } from "./pages/login";
import SearchByIndustry from "./views/SearchIndustry";
import SearchBySymbol from "./views/SearchSymbol";



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
            <p></p>
            {/* {stockData.map(stocks => (
            <Results name={stocks.name} symbol={stocks.symbol} industry={stocks.industry} />))}*/}
          </Route>
            <Route path="/stocks">
              <Stocks />
            </Route>
            <Route path="/quote">
              <Quote />
              <SearchBySymbol />
            </Route>
            <Route path="/login">
              <Login />
             
            </Route>
        </Switch>
      </div>
    </Router>
  );
}
