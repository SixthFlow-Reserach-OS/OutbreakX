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

// Interface defining the structure of marker data
// Each marker has a location (with type and coordinates) and a description
interface MarkerData {
  location: {
    type: string;
    coordinates: [number, number];
  };
  description: string;
}

// Main map component that handles markers and interactions
const MapComponent: React.FC = () => {
  // State for storing markers and right-click position information
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [rightClickPos, setRightClickPos] = useState<{
    lat: number;
    lng: number;
    clientX: number;
    clientY: number;
  } | null>(null);
  const [descriptionDialog, setDescriptionDialog] = useState<{
    isOpen: boolean;
    position: { lat: number; lng: number; } | null;
    description: string;
  }>({
    isOpen: false,
    position: null,
    description: ''
  });

  // Component to handle map events (click and right-click)
  const MapEventHandler = () => {
    useMapEvents({
      // Left click - Add marker with user-provided description
      click: (e) => {
        const { lat, lng } = e.latlng;
        setDescriptionDialog({
          isOpen: true,
          position: { lat, lng },
          description: ''
        });
      },
      // Right click - Show coordinates in a popup overlay
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

  // Add function to handle marker creation
  const handleCreateMarker = () => {
    if (descriptionDialog.position && descriptionDialog.description) {
      const newMarker = {
        location: {
          type: 'Point',
          coordinates: [descriptionDialog.position.lng, descriptionDialog.position.lat]
        },
        description: descriptionDialog.description
      };
      
      axios.post('http://localhost:3001/markers', newMarker)
        .then(response => setMarkers([...markers, response.data]))
        .catch(error => console.error('Error creating marker:', error));
      
      setDescriptionDialog({ isOpen: false, position: null, description: '' });
    }
  };

  return (
    <div>
      {/* Main map container centered on London coordinates */}
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" }}>
        {/* OpenStreetMap tile layer for map rendering */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Render all markers from state */}
        {markers.map((marker, index) => (
          <Marker 
            key={index} 
            position={[marker.location.coordinates[1], marker.location.coordinates[0]]} 
            icon={icon} 
          />
        ))}
        {/* Component that handles map interactions */}
        <MapEventHandler />
      </MapContainer>
      
      {/* Conditional rendering of the right-click coordinate popup */}
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

      {/* Add Description Dialog */}
      {descriptionDialog.isOpen && (
        <div style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 3px 14px rgba(0,0,0,0.15)',
          zIndex: 1000,
          width: '300px',
          border: '1px solid #e0e0e0'
        }}>
          <h3 style={{ margin: '0 0 15px 0' }}>Add Marker Description</h3>
          <textarea
            value={descriptionDialog.description}
            onChange={(e) => setDescriptionDialog({
              ...descriptionDialog,
              description: e.target.value
            })}
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '15px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              minHeight: '100px'
            }}
            placeholder="Enter description for this marker..."
          />
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setDescriptionDialog({ isOpen: false, position: null, description: '' })}
              style={{
                padding: '8px 15px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleCreateMarker}
              style={{
                padding: '8px 15px',
                background: '#4a90e2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add Marker
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;