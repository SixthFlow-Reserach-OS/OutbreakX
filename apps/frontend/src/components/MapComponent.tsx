import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

interface MarkerData {
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  description: string;
}

// Interface for the right-click position data structure
interface RightClickPosition {
  lat: number;      // Latitude of clicked position
  lng: number;      // Longitude of clicked position
  clientX: number;  // X coordinate of mouse click on screen
  clientY: number;  // Y coordinate of mouse click on screen
}

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapComponent: React.FC = () => {
  // State management
  const [markers, setMarkers] = useState<MarkerData[]>([]); // Store map markers
  const [rightClickPos, setRightClickPos] = useState<RightClickPosition | null>(null); // Store right-click position

  // Separate MapEventHandler component
  const MapEventHandler = () => {
    useMapEvents({
      contextmenu: (e) => {
        e.originalEvent.preventDefault();
        const { lat, lng } = e.latlng;
        setRightClickPos({ 
          lat, 
          lng, 
          clientX: e.originalEvent.clientX,
          clientY: e.originalEvent.clientY
        });
      },
      click: (e) => {
        const { lat, lng } = e.latlng;
        const description = prompt("Enter description for this marker:");
        if (description) {
          const newMarker = { 
            location: { 
              type: 'Point', 
              coordinates: [lng, lat] 
            }, 
            description 
          };
          
          axios.post('http://localhost:3001/markers', newMarker)
            .then(response => setMarkers([...markers, response.data]))
            .catch(error => console.error('Error creating marker:', error));
        }
      }
    });
    return null;
  };

  return (
    <div 
      className="map-container" 
      style={{ 
        position: 'relative', 
        height: '100vh', 
        width: '100%',
        padding: '20px',
        backgroundColor: '#f5f5f5'
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <MapContainer 
        center={[51.505, -0.09]}
        zoom={13}
        style={{ 
          height: "100%", 
          width: "100%",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          border: "2px solid #fff"
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((marker, index) => (
          <Marker 
            key={index} 
            position={[marker.location.coordinates[1], marker.location.coordinates[0]]} 
            icon={markerIcon} 
          />
        ))}
        <MapEventHandler />
      </MapContainer>

      {rightClickPos && (
        <div 
          style={{ 
            position: 'absolute',
            left: Math.min(rightClickPos.clientX, window.innerWidth - 250),
            top: Math.min(rightClickPos.clientY, window.innerHeight - 150),
            backgroundColor: 'white',
            padding: '15px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
            zIndex: 1000,
            minWidth: '200px',
            border: '1px solid #eaeaea'
          }}
        >
          <button 
            onClick={() => setRightClickPos(null)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '10px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              color: '#666',
              padding: '5px'
            }}
          >
            ✕
          </button>

          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ 
              margin: '0 0 15px 0',
              color: '#333',
              fontSize: '18px'
            }}>
              Location Details
            </h3>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <div style={{ marginBottom: '8px' }}>
              <label style={{ 
                marginRight: '8px',
                color: '#666',
                fontWeight: '500'
              }}>
                Latitude:
              </label>
              <span style={{ color: '#333' }}>{rightClickPos.lat.toFixed(6)}</span>
            </div>
            <div>
              <label style={{ 
                marginRight: '8px',
                color: '#666',
                fontWeight: '500'
              }}>
                Longitude:
              </label>
              <span style={{ color: '#333' }}>{rightClickPos.lng.toFixed(6)}</span>
            </div>
          </div>

          <button 
            onClick={() => navigator.clipboard.writeText(`${rightClickPos.lat},${rightClickPos.lng}`)}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#4a90e2',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#357abd';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#4a90e2';
            }}
          >
            <span>📋</span> Copy Coordinates
          </button>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
