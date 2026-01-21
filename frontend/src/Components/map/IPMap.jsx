import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ISO3_TO_ISO2 } from "./countryCodeMap";
import { hasAccess } from "../../utils/permissions";



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

  // Style for countries
  const countryStyle = {
    fillColor: "#dcdcdc",
    weight: 1,
    color: "#555",
    fillOpacity: 0.2,
  };

  // Attach click + hover to each country
  const onEachCountry = (feature, layer) => {
  const iso3 = feature.id;           // IND, USA, TZA
  const iso2 = ISO3_TO_ISO2[iso3];   // IN, US, TZ

  layer.on({
      click: () => {
        if (!canUseMap) {
          alert("🔒 Upgrade your plan to access the IP Map");
          return;
        }

        if (!iso2) {
          console.warn("No ISO-2 mapping for:", iso3);
          return; // ⛔ do not call backend
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
    <div style={{ height: "300px", width: "100%" }}>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {countries && (
          <GeoJSON
            data={countries}
            style={countryStyle}
            onEachFeature={onEachCountry}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default IPMap;
