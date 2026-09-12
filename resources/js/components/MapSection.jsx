import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Icon marker kustom
const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

export default function MapSection({ destinations = [], selectedDestination }) {
  const defaultCenter = [-7.1664, 107.3582]; // Bandung / West Java

  return (
    <div style={{ height: '420px', width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
      <MapContainer 
        center={selectedDestination ? [selectedDestination.latitude, selectedDestination.longitude] : defaultCenter} 
        zoom={9} 
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {destinations.map((d) => (
          <Marker key={d.id} position={[d.latitude, d.longitude]} icon={customIcon}>
            <Popup>
              <div style={{ width: '160px', padding: '4px' }}>
                <img src={d.image} alt={d.name} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                <h4 style={{ margin: '6px 0 2px 0', fontSize: '13px' }}>{d.name}</h4>
                <p style={{ margin: 0, fontSize: '11px', color: '#64748B' }}>{d.location}</p>
                <p style={{ margin: '4px 0 0 0', fontWeight: 'bold', color: '#2563EB', fontSize: '12px' }}>{d.price_formatted}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}