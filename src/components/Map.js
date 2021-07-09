import React from 'react';
import { MapContainer , TileLayer, useMap } from 'react-leaflet';
import './Map.css';
import { showDataOnMap } from '../util';


function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

function Map({countries, casesType, center, zoom}) {
    return (
        <div className="map">
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
