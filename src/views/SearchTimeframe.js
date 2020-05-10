import  React, { useState } from "react";
import SearchTimeFrameTable from "../components/SearchTimeFrameTable";

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
          if (res.status === 400){
            alert("You must select dates for both from and to, as well as have a correct stock symbol entered")
            throw new Error(400)
          }
          if (res.status === 403){
            alert("You must be logged in to view price history")
            throw new Error(403)
          }
          if (res.status === 404){
            alert("No entries available for stock with supplied date range")
            throw new Error(404)
          }
          return res.json() })
        
        .then(data => setSearchResults(data)
        
          )
        
        .catch(Error);
    }
        }>Search By Symbol</button> 
        
     {searchResults.length > 0 ? (
     <div id="timeframeSearch" className="ag-theme-balham-dark">
      <SearchTimeFrameTable searchResults={searchResults} />
      </div>)
            : ('')
          }
     
      </div>
          )}