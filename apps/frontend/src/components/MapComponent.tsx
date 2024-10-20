import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

interface MarkerData {
  location: {
    type: string;
    coordinates: [number, number];
  };
  description: string;
}

const icon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapComponent: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        const description = prompt("Enter description for this marker:");
        if (description) {
          const newMarker = { location: { type: 'Point', coordinates: [lng, lat] }, description };
          axios.post('http://localhost:3001/markers', newMarker)
            .then(response => setMarkers([...markers, response.data]))
            .catch(error => console.error('Error creating marker:', error));
        }
      }
    });
    return null;
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={[marker.location.coordinates[1], marker.location.coordinates[0]]} icon={icon} />
      ))}
      <MapClickHandler />
    </MapContainer>
  );
};

export default MapComponent;
