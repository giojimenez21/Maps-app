import "./index.css"
import React from "react";
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import ReactDOM from "react-dom/client";
import { MapsApp } from "./MapsApp";

if (!navigator.geolocation) {
    alert('No esta activada la Geolocation');
    throw new Error('No esta activada la Geolocation');
}

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <MapsApp />
    </React.StrictMode>
);
