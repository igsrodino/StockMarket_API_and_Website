import React ,{ useState, useEffect } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import SearchTable from "../components/SearchIndustryTable";

const API_URL = 'http://131.181.190.87:3000'
const url = `${API_URL}/stocks/symbols`

export default function StocksApp(){
const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(res => {
        if (res.status === 404){
          //throw "404"
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
      .catch(error => alert(error));
  }, []);

    return (
      <div className="container">
      <p></p>
      <h1>Stocks List</h1>
      <p>{rowData.length} Stocks loaded</p>
      <div className="ag-theme-balham-dark" style={{rowHeight: "500px"}}>
      <SearchTable searchResults={rowData} />
      </div>
      </div>
    );
  }

