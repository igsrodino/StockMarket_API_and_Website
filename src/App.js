import React from "react";
import "./styles.css";
// import { Navbar, Nav } from 'react-bootstrap';
import Menu from "./components/Nav";
import Home from "./pages/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Stocks from "./pages/stocks";
import { useAPI, Headline } from "./api";

import { AgGridReact } from "ag-grid-react";
// import Header from "./components/Header.jsx";
// import {Nav, Navbar} from 'react-bootstrap/Navbar'
const table = {
  columns: [
    {headerName: "Make", field: "make" }, 
    {headerName: "Model", field: "model"}, 
    {headerName: "Price", field: "price"}
  ],
  rowData: [
    {make: "Toyota", model: "Camry", price: 28888}
  ]
}
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
        

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/stocks">
            <Stocks />
            {stockData.map(stocks => (
          <Headline name={stocks.name} symbol={stocks.symbol} industry={stocks.industry} />
        ))}
        <div
        className="ag-theme-balham"
        style={{
          height: "300px",
          width: "600px"
        }}>
          <AgGridReact
          columnDefs={table.columns}
          rowData={table.rowData}
          pagination={true} />
        </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
