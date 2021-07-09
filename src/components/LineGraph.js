import React, { useEffect,useState } from 'react'
import numeral from 'numeral';
import {Line} from 'react-chartjs-2';

const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };  

  const buildChartData=(data,casesType)=>{

    /* react chart.js requires an array of objects of form {x:val,y:val} as the required coordinate 
        here y coordinate stores the difference of y-coordinate of current point from prev. point
    */

    const chartData=[];
    let lastDatePoint;
    for(let date in data[casesType]){
        const newData={
            x:date,
            y:data[casesType][date]-lastDatePoint
        }
        chartData.push(newData);
        lastDatePoint=data[casesType][date]
    }

    // console.log(chartData);

    return chartData;
}


function LineGraph({casesType}) {
    const [data,setData]=useState({});

    useEffect(() => {
        const fetchData= async ()=>{
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then(response=>response.json())
            .then((data)=>{
                    const chartdata=buildChartData(data,casesType);
                    setData(chartdata)
            });
        }

        fetchData();
        
    }, [casesType])

    // data?.length 
    
    return (
        <div>
            {data?.length&&(<Line options={options} data={{
                datasets : [{
                    backgroundColor: "rgba(204, 16, 52, 0.5)",
                    borderColor: "#CC1034",
                    data: data,
                },]
            }} />)}
            
        </div>
    )
}

export default LineGraph
