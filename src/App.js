import React from "react";
import "./styles.css";
import Menu from "./components/Nav";
import Home from "./pages/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Stocks from "./pages/stocks";
import { useAPI, Headline } from "./api";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import { Badge } from "react-bootstrap";



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
      ()=>props.onSubmit(innerSearch)}>
        Search
        </button>
        </div>
        );}

export default function App() {
const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetch("http://131.181.190.87:3000/stocks/symbols")
      .then(res => res.json())
      .then(data => data.map(data => {
          return {
            name: data.name,
            symbol: data.symbol,
            industry: data.industry,
          };
        })
      )
      .then(data => setRowData(data));
  }, []);

  const columns = [
    { headerName: "Name", field: "name", resizable: true , sortable:true, filter:true},
    { headerName: "Symbol", field: "symbol", resizable: true, sortable:true, filter:true },
    { headerName: "Industry", field: "industry", resizable: true, sortable:true, filter:true },
    
  ];

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
         <Switch>
          <Route exact path="/">
            <Home />
            
            <SearchBar />
            <p></p>
            {stockData.map(stocks => (
            <Headline name={stocks.name} symbol={stocks.symbol} industry={stocks.industry} />))}
          </Route>
            <Route path="/stocks">
              <Stocks />
              <div className="container">
              <h1>Stocks List</h1>
              <p><Badge color="success">{rowData.length}</Badge> Stocks loaded</p>
              <div className="ag-theme-balham-dark" style={{rowHeight: "500px"}}>
                <AgGridReact
                  columnDefs={columns}
                  rowData={rowData}
                  pagination={true}
                  paginationPageSize={25} />
              </div>
              <Stocks />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
