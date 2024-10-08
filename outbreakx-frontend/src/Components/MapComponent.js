// src/MapComponent.js

import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

// Set your Mapbox access token from environment variable
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const MapComponent = () => {
  useEffect(() => {
    // Initialize the map
    const map = new mapboxgl.Map({
      container: 'map', // ID of the container where the map will be rendered
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [-74.5, 40], // Starting position [lng, lat]
      zoom: 9, // Starting zoom level
    });

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Clean up on component unmount
    return () => map.remove();
  }, []);

  return <div id="map" style={{ width: '100%', height: '100vh' }} />;
};

export default MapComponent;
