import React, { useEffect, useState } from 'react';
import './LocationMap.css';
import { MapContainer, TileLayer, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LocationMarker = ({ setCity }) => {
  useMapEvents({
    click: (e) => {
      const lat = e.latlng.lat;
      const lon = e.latlng.lng;
      fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`)
        .then(res => res.json())
        .then(data => {
          const location = data.city || data.locality || data.principalSubdivision;
          if (location) setCity(location);
        });
    },
  });
  return null;
};

// 👇 this must be a child of <MapContainer>
const MapUpdater = ({ city }) => {
  const map = useMap();

  useEffect(() => {
    async function fetchCityCoords() {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=6c0b400828f962a4fd37ef4408fc7ff0`
        );
        const data = await res.json();
        if (data && data[0]) {
          const lat = data[0].lat;
          const lon = data[0].lon;
          map.setView([lat, lon], 10);
        }
      } catch (err) {
        console.error("Failed to geocode city", err);
      }
    }

    if (city) {
      fetchCityCoords();
    }
  }, [city, map]);

  return null;
};

const LocationMap = ({ setCity, city }) => {
  const [center] = useState([17.385, 78.4867]); // static default

  return (
    <div className="location-map mb-4">
      <h5 className="mb-2">Click on Map to get Weather</h5>
      <MapContainer center={center} zoom={5} style={{ height: "300px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker setCity={setCity} />
        <MapUpdater city={city} />
      </MapContainer>
    </div>
  );
};

export default LocationMap;
