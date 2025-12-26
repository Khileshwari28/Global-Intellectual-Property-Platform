import React from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Mock IP distribution data (API-ready)
const ipData = [
  { country: "United States", lat: 37.0902, lng: -95.7129, count: 120 },
  { country: "India", lat: 20.5937, lng: 78.9629, count: 60 },
  { country: "Germany", lat: 51.1657, lng: 10.4515, count: 40 },
  { country: "Japan", lat: 36.2048, lng: 138.2529, count: 30 },
];

const IPMap = () => {
  return (
    <div style={{ height: "220px", width: "100%", borderRadius: "8px", overflow: "hidden" }}>
      <MapContainer
        center={[20, 0]}
        zoom={1}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {ipData.map((item, index) => (
          <CircleMarker
            key={index}
            center={[item.lat, item.lng]}
            radius={Math.max(6, item.count / 15)}
            pathOptions={{
              color: "#0d6efd",
              fillColor: "#0d6efd",
              fillOpacity: 0.6
            }}
          >
            <Tooltip direction="top" offset={[0, -5]} opacity={1}>
              <div style={{ fontSize: "12px" }}>
                <strong>{item.country}</strong><br />
                Filings: {item.count}
              </div>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default IPMap;
