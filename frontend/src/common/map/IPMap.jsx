import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ISO3_TO_ISO2 } from "./countryCodeMap";
import { hasAccess } from "../utils/permissions";

const IPMap = ({ onCountrySelect }) => {
  const [countries, setCountries] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const plan = user?.plan;
  const role = user?.role;

  const canUseMap = role === "ADMIN" || hasAccess(plan, "canSeeMaps");

  // Load world countries GeoJSON
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
    )
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  const countryStyle = {
    fillColor: "#dcdcdc",
    weight: 1,
    color: "#555",
    fillOpacity: 0.2,
  };

  const onEachCountry = (feature, layer) => {
    const iso3 = feature.id;
    const iso2 = ISO3_TO_ISO2[iso3];

    layer.on({
      click: () => {
        if (!iso2) {
          console.warn("No ISO-2 mapping for:", iso3);
          return;
        }
        console.log("Map clicked:", iso3, "→", iso2);
        onCountrySelect(iso2);
      },
      mouseover: () => {
        layer.setStyle({ fillColor: "#0d6efd", fillOpacity: 0.4 });
      },
      mouseout: () => {
        layer.setStyle(countryStyle);
      },
    });
  };

  return (
    <div style={{ position: "relative", height: "300px", width: "100%" }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "100%" }}
        // block interaction entirely while locked
        dragging={canUseMap}
        scrollWheelZoom={canUseMap}
        doubleClickZoom={canUseMap}
        zoomControl={canUseMap}
        touchZoom={canUseMap}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {countries && (
          <GeoJSON
            data={countries}
            style={countryStyle}
            onEachFeature={canUseMap ? onEachCountry : undefined}
          />
        )}
      </MapContainer>

      {!canUseMap && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.7)",
            border: "1px dashed #ccc",
            borderRadius: "6px",
            textAlign: "center",
            zIndex: 1000, // sits above Leaflet's panes
          }}
        >
          <div>
            <h6>🔒 IP Map Locked</h6>
            <small className="text-muted">
              Upgrade your plan to access the IP Map.
            </small>
          </div>
        </div>
      )}
    </div>
  );
};

export default IPMap;