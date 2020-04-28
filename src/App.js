import React from "react";
import "./styles.css";
import Menu from "./components/Nav";
import Home from "./pages/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Stocks from "./pages/stocks";
import { useAPI, Results } from "./api";
import { useState } from "react";
// import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
// import { Badge } from "react-bootstrap";
import {Login} from "./pages/login";


function SearchBar(props) {
  const[innerSearch, setInnerSearch] = useState('');
  return(
  <div>
    <input 
      aria-labelledby="search-button"
      name="search"
      id="search"
      type="search"
      value={innerSearch}onChange={
      (e)=>setInnerSearch(e.target.value)
    }/>
    <button id="search-button"
      type="button"onClick={
      () => props.onSubmit(innerSearch)}>Search
    </button>
    </div>
        );}

export default function App(search) {

  const { loading, stockData, error } = useAPI(search);
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
         <Switch>
          <Route exact path="/">
            <Home />
            <SearchBar />
            <p></p>
            {stockData.map(stocks => (
            <Results name={stocks.name} symbol={stocks.symbol} industry={stocks.industry} />))}
          </Route>
            <Route path="/stocks">
              <Stocks />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
        </Switch>
      </div>
    </Router>
  );
}
