import  React, { useState } from "react";
import SearchTable from "../components/SearchIndustryTable";

export default function SearchByIndustry() {
    const[searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    // const industries = [
    //   {label: "Health Care", value: "Health Care"},
    //   {label: "Financials", value: "Financials"},
    //   {label: "Industrials", value: "Industrials"},
    //   {label: "Real Estate", value: "Real Estate"},
    //   {label: "Consumer Discretionary", value: "Consumer Discretionary"},
    //   {label: "Materials", value: "Materials"},
    //   {label: "Information Technology", value: "Information Technology"},
    //   {label: "Energy", value: "Energy"},
    //   {label: "Consumer Staples", value: "Consumer Staples"},
    //   {label: "Telecommunication Services", value: "Telecommunication Services"},
    //   {label: "Utilities", value: "Utilities"}


    // ]
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
      <button id="search-button" type="button" onClick={()=>
        {fetch(`http://131.181.190.87:3000/stocks/symbols?industry=${searchTerm}`)
        .then(res => {
          if (res.status === 400){
            alert("Sorry industry not found")
            throw new Error(400)
          }
          if (res.status === 404){
            alert("Sorry industry not found")
            throw new Error(404)
          }
          return res.json() })
        
        .then(data => setSearchResults(data)
 
        )
      
        .catch(Error);
        }
        }>Search By Industry</button> 
        
     {searchResults.length > 0 ? (

     <div className="ag-theme-balham-dark">
      <SearchTable searchResults={searchResults} />
      <p>Industries</p>
      </div>)
            : ('')
          }
     
      </div>
          )}