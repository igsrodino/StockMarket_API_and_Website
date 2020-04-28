import React, { useState, useEffect } from "react";


// const API_KEY = '06d97fb9855a4e29a386e3869229d4ed'


export function Results(props){
  return(
    <div>{props.name + '; Symbol:' + props.symbol + '; Industry:' + props.industry}</div>
  )
}

export function useAPI(search) { 
  const [loading, setLoading] = useState(true); 
  const [stockData, setResults] = useState([]); 
  const [error, setError] = useState(null);

  useEffect(() => { 
   getResults(search)
    .then((stockData) => {
      setResults(stockData); 
      setLoading(false);}) 
    .catch((e) => { 
        setError(e); 
        setLoading(false);
      });
    },[search]);
  return { 
    loading, 
    stockData, 
    error, 
  };
  }

function getResults() {
  const url = `http://131.181.190.87:3000/stocks/symbols`;

  return fetch(url)
  .then((res) => res.json())
  .then((data) =>
  data.map((data) => ({
    name: data.name,
    symbol: data.symbol,
    industry: data.industry,
  })),
  );
}
// https://github.com/jaredpalmer/formik