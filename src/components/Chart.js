import React from 'react';
import { Line } from 'react-chartjs-2';


// Designs template for a chart
export default function LineChart(){
const data = {
  labels: ['15/04', '16/04', '17/04', '18/04', '19/04', '20/04', '21/04', '22/04', '23/04', '24/04'],
  datasets: [
    {
      label: 'Stock Symbol Chart',
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'lightgrey',
      borderColor: 'black',
      borderCapStyle: 'butt',
      borderDash: [1],
      pointBackgroundColor: 'black',
      pointBorderWidth: 1,
      pointHoverRadius: 2,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      data: [20, 21, 25, 15, 11, 15, 10, 26, 29, 25, 0]
    }
  ]
};
 
    return (
      <div id="chart">
        <h2>Stock Price Chart</h2>
        <Line data={data} />
      </div>
    );
  }
