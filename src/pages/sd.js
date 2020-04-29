stocks.filter(stockel => 
    stockel.industry.includes(search) || stockel.symbol.includes(search))