import  React, { useState } from "react";
import SearchTable from "../components/SearchIndustryTable";


// Function to search stock by industry using API and display using table component.
export default function SearchByIndustry() {
    const[searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    return(
    <div>
      <div id="homeIndustry">
          <h5><b>Search desired stocks by industry:</b></h5>
          <h6><b><i>Available Industries</i></b></h6>
          <p>Health Care, Financials, Industrials, Real Estate, Consumer Discretionary,
            Materials, Information Technology, Energy, Consumer Staples, Telecommunication 
            Services and Utilities</p>
      </div>

      <input 
        aria-labelledby="search-button"
        name="search"
        id="search"
        placeholder="Enter Industry"
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
        
        {/* If there are any results, display table */}
        {searchResults.length > 0 ? (
        <div className="ag-theme-balham-dark">
          <SearchTable searchResults={searchResults} />
        </div>)
                : ('')
              }
        
    </div>
              )}