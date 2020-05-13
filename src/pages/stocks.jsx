import React ,{ useState, useEffect } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import SearchTable from "../components/SearchIndustryTable";


// Load all stocks available page
const API_URL = 'http://131.181.190.87:3000'
const url = `${API_URL}/stocks/symbols`

export default function StocksApp(){
const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(res => {
        if (res.status === 404){
          alert("Error loading stocks")
          throw new Error(400)
        }
        return res.json() })
      .then(data => data.map(data => {
          
        return {
            name: data.name,
            symbol: data.symbol,
            industry: data.industry,
          };
        })
      )
      .then(data => setRowData(data))

      .catch(Error);
  }, []);

    return (
      <div className="container">
        <p></p>
        <h1><b>All Stocks</b></h1>
        <p>Number of stocks loaded: {rowData.length} Stocks</p>
        <div className="ag-theme-balham-dark" style={{rowHeight: "500px"}}>
          <SearchTable searchResults={rowData} />
        </div>
      </div>
    );
  }

