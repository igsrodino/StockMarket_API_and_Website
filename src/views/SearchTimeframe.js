import  React, { useState } from "react";
import SearchSymbolTable from "../components/SearchSymbolTable";

export default function SearchBySymbol() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState('');

    const [startDate, setStartDate]= useState('');
    const [endDate, setEndDate] = useState('');

    const token = localStorage.getItem("token");

    const headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    // console.log(headers);

    return(
    <div>
      <input 
        aria-labelledby="search-button"
        name="search"
        id="search"
        type="search"
        value={searchTerm}onChange={
        (e)=>setSearchTerm(e.target.value)
      }/>
      <input 
        type="date" 
        id="startDate" 
        value={startDate}onChange={
          (e)=>setStartDate(e.target.value)
        }
      />
      <input 
        type="date" 
        id="endDate" 
        value={endDate}onChange={
          (e)=>setEndDate(e.target.value)
        }
      />
     
      <button id="search-button" type="button"
       onClick={()=>
        {fetch(`http://131.181.190.87:3000/stocks/authed/${searchTerm}?from=${startDate}&to=${endDate}`, {headers})
        .then(res => {
          if (res.status === 404){
            //throw "404"
          }
          return res.json() })
        
        .then(data => {
          for(var k in data) {
          var data2 = [(k, data[k])];
          console.log(data2)
        } return setSearchResults(data)
        
          })
        
        .catch(error => alert(error));
    }
        }>Search By Symbol</button> 
        
     {searchResults.length > 0 ? (
     <div id="timeframeSearch" className="ag-theme-balham-dark">
      <SearchSymbolTable searchResults={searchResults} />
      </div>)
            : ('')
          }
     
      </div>
          )}