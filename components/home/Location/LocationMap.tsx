"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { renderToString } from "react-dom/server";
import { LuBed } from "react-icons/lu";

const customIconHtml = renderToString(
  <div className="relative flex items-center justify-center w-8 h-8 bg-[#002179] text-white rounded-full rounded-bl-none -rotate-45 shadow-lg transition-transform hover:scale-110">
    <LuBed className="text-sm rotate-45 text-2xl" />
  </div>
);

const reactIconMarker = L.divIcon({
  html: customIconHtml,
  className: "custom-leaflet-icon",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

interface MapContentProps {
  position: [number, number];
}

export default function LocationMap({ position }: MapContentProps) {
  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={false}
      dragging={true}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={reactIconMarker}>
        <Popup defaultOpen>
          <div className="font-sans font-semibold text-gray-800">
            Lúmen Hotel
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}