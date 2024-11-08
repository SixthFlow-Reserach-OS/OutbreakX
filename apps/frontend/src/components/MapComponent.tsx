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

  // Component to handle map events (click and right-click)
  const MapEventHandler = () => {
    useMapEvents({
      // Handle right-click events
      contextmenu: (e) => {
        const { lat, lng } = e.latlng;
        // Save both geographical coordinates and screen coordinates
        setRightClickPos({ 
          lat, 
          lng, 
          clientX: e.originalEvent.clientX,
          clientY: e.originalEvent.clientY
        });
        e.originalEvent.preventDefault(); // Prevent default context menu
      },

      // Handle left-click events for adding markers
      click: (e) => {
        const { lat, lng } = e.latlng;
        const description = prompt("Enter description for this marker:");
        if (description) {
          // Create new marker with coordinates and description
          const newMarker = { 
            location: { 
              type: 'Point', 
              coordinates: [lng, lat] 
            }, 
            description 
          };
          
          // Save marker to backend and update state
          axios.post('http://localhost:3001/markers', newMarker)
            .then(response => setMarkers([...markers, response.data]))
            .catch(error => console.error('Error creating marker:', error));
        }
      }
    });
    return null;
  };

  return (
    <div>
      {/* Main Map Container */}
      <MapContainer 
        center={[51.505, -0.09]} // Initial center position (London)
        zoom={13}                // Initial zoom level
        style={{ height: "100vh", width: "100%" }}
      >
        {/* Base map layer using OpenStreetMap */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Render all markers on the map */}
        {markers.map((marker, index) => (
          <Marker 
            key={index} 
            position={[marker.location.coordinates[1], marker.location.coordinates[0]]} 
            icon={markerIcon} 
          />
        ))}

        {/* Add event handler component */}
        <MapEventHandler />
      </MapContainer>

      {/* Right-click coordinate display box */}
      {rightClickPos && (
        <div style={{ 
          position: 'fixed',
          // Position box near click location, but prevent it from going off-screen
          left: Math.min(rightClickPos.clientX + 10, window.innerWidth - 250),
          top: Math.min(rightClickPos.clientY + 10, window.innerHeight - 150),
          // ... styling properties ...
        }}>
          {/* Close button */}
          <button onClick={() => setRightClickPos(null)}>✕</button>

          {/* Title section */}
          <div>
            <h3>Location Details</h3>
          </div>

          {/* Coordinates display section */}
          <div>
            {/* Latitude display */}
            <div>
              <label>Latitude</label>
              <span>{rightClickPos.lat.toFixed(6)}</span>
            </div>
            
            {/* Longitude display */}
            <div>
              <label>Longitude</label>
              <span>{rightClickPos.lng.toFixed(6)}</span>
            </div>
          </div>

          {/* Copy coordinates button */}
          <button 
            onClick={() => navigator.clipboard.writeText(
              `${rightClickPos.lat},${rightClickPos.lng}`
            )}
          >
            <span>📋</span> Copy Coordinates
          </button>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
