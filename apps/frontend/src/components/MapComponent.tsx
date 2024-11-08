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
  const [rightClickPos, setRightClickPos] = useState<{
    lat: number;
    lng: number;
    clientX: number;
    clientY: number;
  } | null>(null);

  const MapEventHandler = () => {
    useMapEvents({
      // Left click - Add marker
      click: (e) => {
        const { lat, lng } = e.latlng;
        const description = prompt("Enter description for this marker:");
        if (description) {
          const newMarker = { location: { type: 'Point', coordinates: [lng, lat] }, description };
          axios.post('http://localhost:3001/markers', newMarker)
            .then(response => setMarkers([...markers, response.data]))
            .catch(error => console.error('Error creating marker:', error));
        }
      },
      // Right click - Show coordinates
      contextmenu: (e) => {
        const { lat, lng } = e.latlng;
        setRightClickPos({ 
          lat, 
          lng, 
          clientX: e.originalEvent.clientX,
          clientY: e.originalEvent.clientY
        });
        e.originalEvent.preventDefault();
      }
    });
    return null;
  };

  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => (
          <Marker 
            key={index} 
            position={[marker.location.coordinates[1], marker.location.coordinates[0]]} 
            icon={icon} 
          />
        ))}
        <MapEventHandler />
      </MapContainer>
      
      {rightClickPos && (
        <div style={{ 
          position: 'fixed',
          left: Math.min(rightClickPos.clientX + 10, window.innerWidth - 250),
          top: Math.min(rightClickPos.clientY + 10, window.innerHeight - 150),
          background: 'white', 
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 3px 14px rgba(0,0,0,0.15)',
          zIndex: 1000,
          width: '220px',
          border: '1px solid #e0e0e0',
          fontFamily: 'Arial, sans-serif'
        }}>
          <button 
            onClick={() => setRightClickPos(null)}
            style={{ 
              position: 'absolute',
              right: '8px',
              top: '8px',
              border: 'none',
              background: '#f5f5f5',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
              color: '#666',
              fontSize: '14px',
              transition: 'all 0.2s ease'
            }}
          >
            ✕
          </button>

          <div style={{ marginBottom: '12px', paddingRight: '20px' }}>
            <h3 style={{ 
              margin: '0 0 10px 0',
              color: '#333',
              fontSize: '16px',
              fontWeight: 600 
            }}>
              Location Details
            </h3>
          </div>

          <div style={{
            background: '#f8f9fa',
            padding: '10px',
            borderRadius: '6px',
            marginBottom: '12px'
          }}>
            <div style={{ marginBottom: '8px' }}>
              <label style={{ 
                color: '#666', 
                fontSize: '12px', 
                display: 'block',
                marginBottom: '2px'
              }}>
                Latitude
              </label>
              <span style={{ 
                color: '#333',
                fontSize: '14px',
                fontFamily: 'monospace'
              }}>
                {rightClickPos.lat.toFixed(6)}
              </span>
            </div>
            
            <div>
              <label style={{ 
                color: '#666', 
                fontSize: '12px', 
                display: 'block',
                marginBottom: '2px'
              }}>
                Longitude
              </label>
              <span style={{ 
                color: '#333',
                fontSize: '14px',
                fontFamily: 'monospace'
              }}>
                {rightClickPos.lng.toFixed(6)}
              </span>
            </div>
          </div>

          <button 
            onClick={() => navigator.clipboard.writeText(`${rightClickPos.lat},${rightClickPos.lng}`)}
            style={{ 
              width: '100%',
              padding: '8px 12px',
              background: '#4a90e2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'background 0.2s ease'
            }}
          >
            <span style={{ fontSize: '16px' }}>📋</span> Copy Coordinates
          </button>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
