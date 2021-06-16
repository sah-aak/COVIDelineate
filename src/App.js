import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core';
import React, {useState,useEffect} from 'react';
import './App.css';
import Infobox from './components/Infobox';
import Map from './components/Map';
import Table from './components/Table';
import LineGraph from './components/LineGraph';
import "leaflet/dist/leaflet.css";
import numeral from 'numeral';

function App() {

  const [countries,setCountries]=useState([]);
  const [country,setCountry]=useState("worldwide");
  const [countryInfo,setCountryInfo]=useState({});
  const [tableData,setTableData]=useState([]);
  const [mapCenter,setMapCenter]=useState([34.80746,-40.4796]);
  const [mapZoom,setMapZoom]=useState(3);
  const [mapCountries,setmapCountries]=useState([]);
  const [casesType,setCasesType]=useState("cases");

  useEffect(()=>{
    const countriesData=async ()=>{
      await fetch('https://disease.sh/v3/covid-19/countries').then((response)=>{
        return response.json();
      })
      .then((data)=>{
        const countries=data.map((country)=>(
          {
            name:country.country,
            value:country.countryInfo.iso2
          }
        ))

        data.sort((a,b)=>{
          if(a.cases>b.cases){
            return -1;
          }
          else{
            return 1;
          }
        })
        setmapCountries(data);
        setTableData(data);
        setCountries(countries);
      });
    }

    countriesData();

    const fetchWorldwide=async ()=>{
      await fetch("https://disease.sh/v3/covid-19/all").then((response)=>{
        return response.json();
      })
      .then((data)=>{
        setCountryInfo(data);
      });
    }
    fetchWorldwide();

  },[]);

  const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

  const onCountryChange = async (event)=>{
      const countryCode=event.target.value;
  
      const url=countryCode==="worldwide"?"https://disease.sh/v3/covid-19/all":`https://disease.sh/v3/covid-19/countries/${countryCode}`;

      await fetch(url).then(response=>response.json())
      .then((data)=>{
        setCountry(countryCode);
        setCountryInfo(data);  
        let center_lat=(!(data.country)?34.80746:data.countryInfo.lat);
        let center_lng=(!(data.country)?-40.4796:data.countryInfo.long);
        setMapCenter([center_lat,center_lng]);
        setMapZoom(4);
      })

      //console.log(countryInfo);  
      // console.log(mapCenter);
      // console.log(mapZoom);    
  }

  return (
    <div className="App">
      <div className="app_left">
            <div className="app_header">
              <h1>COViDileanate - covid-19 tracker</h1>
              <FormControl className="app_dropdown">
                <Select variant="outlined" value={country} onChange={onCountryChange}>
                    <MenuItem value="worldwide">WorldWide</MenuItem>
                    {
                      countries.map(country=>{
                      return <MenuItem value={country.value}>{country.name}</MenuItem>
                      })
                    }
                </Select>
              </FormControl>    
            </div> 

            <div className="app_stats">
              <Infobox title="Corona-virus cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} onClick={e=>setCasesType("cases")}/>
              <Infobox title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)} onClick={e=>setCasesType("recovered")}/>
              <Infobox title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)} onClick={e=>setCasesType("deaths")}/>
            </div>
            
            <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
      </div>

      <Card className="app_right">
          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData}/>
            <h3>World-wide new Cases</h3>
            <LineGraph casesType={casesType}/>
          </CardContent>
      </Card>


    </div>
  );
}

export default App;
