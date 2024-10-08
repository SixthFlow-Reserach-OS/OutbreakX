// src/MapComponent.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

const LocationFinder = ({ position }) => {
  const map = useMap();

  const centerMapOnLocation = () => {
    if (position) {
      map.setView(position, map.getZoom());
    }
  };

  return (
    <button
      style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        padding: '10px',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '4px',
        zIndex: 1000,
      }}
      onClick={centerMapOnLocation}
    >
      Find My Location
    </button>
  );
};

const MapComponent = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            setPosition([latitude, longitude]);
          },
          (error) => {
            setError(error.message);
          },
          { enableHighAccuracy: true }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!position) {
    return <div>Loading...</div>;
  }

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '750px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}> {/* No custom icon, default icon will be used */}
        <Popup>
          You are here! <br /> Latitude: {position[0]}, Longitude: {position[1]}
        </Popup>
      </Marker>
      <LocationFinder position={position} />
    </MapContainer>
  );
};

export default MapComponent;
