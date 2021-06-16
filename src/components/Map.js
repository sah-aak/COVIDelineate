import React from 'react';
import { MapContainer , TileLayer, Circle, Popup, useMap } from 'react-leaflet';
import './Map.css';
import numeral from 'numeral';

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 800,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",
      half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(251, 68, 67)",
      half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 2000,
    },
  };


//draw circles on map
const showDataOnMap = (data,casesType="cases")=>{
    data.map((country)=>
        <Circle center={[country.countryInfo.lat,country.countryInfo.long]} 
            fillOpacity={0.4} 
            color={casesTypeColors[casesType].hex} 
            fillColor={casesTypeColors[casesType].hex} 
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }>
            {console.log("yes")}
            <h1>hello :)</h1>
            <Popup>
            {console.log("no")}
                <div className="info-container">
                    <div
                    className="info-flag"
                    style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                    ></div>
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed">
                    Cases: {numeral(country.cases).format("0,0")}
                    </div>
                    <div className="info-recovered">
                    Recovered: {numeral(country.recovered).format("0,0")}
                    </div>
                    <div className="info-deaths">
                    Deaths: {numeral(country.deaths).format("0,0")}
                    </div>
                </div>
            </Popup>
        </Circle>
    )
}

function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

function Map({countries, casesType, center, zoom}) {
    return (
        <div className="map">
        {console.log(center)}
        {console.log(zoom)}
            <MapContainer class="leaflet-container" center={center} zoom={zoom}>
                <ChangeView center={center} zoom={zoom} /> 
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
            {showDataOnMap(countries,casesType)}
        </div>
    )
}

export default Map
