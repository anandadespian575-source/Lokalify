import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '250px',
  borderRadius: '8px',
  marginTop: '8px'
};

const defaultCenter = {
  lat: -7.1662,
  lng: 107.3575 // Area Bandung/Ciwidey
};

export default function MapPicker({ apiKey, onSelectLocation, initialLat, initialLng }) {
  const [markerPos, setMarkerPos] = useState({
    lat: initialLat || defaultCenter.lat,
    lng: initialLng || defaultCenter.lng
  });

  const handleMapClick = (e) => {
    const newLat = e.latLng.lat();
    const newLng = e.latLng.lng();
    setMarkerPos({ lat: newLat, lng: newLng });
    fetchAddress(newLat, newLng);
  };

  const handleMarkerDragEnd = (e) => {
    const newLat = e.latLng.lat();
    const newLng = e.latLng.lng();
    setMarkerPos({ lat: newLat, lng: newLng });
    fetchAddress(newLat, newLng);
  };

  // Reverse Geocoding via Nominatim OpenStreetMap (Gratis tanpa key)
  const fetchAddress = async (lat, lng) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      const addressName = data.display_name ? data.display_name.split(',').slice(0, 3).join(',') : `Lokasi (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
      onSelectLocation({ lat, lng, address: addressName });
    } catch {
      onSelectLocation({ lat, lng, address: `Lokasi Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}` });
    }
  };

  return (
    <div>
      <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569' }}>
        📍 Klik atau Geser Pin di Peta untuk Menentukan Lokasi Wisata:
      </label>
      {apiKey ? (
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={markerPos}
            zoom={13}
            onClick={handleMapClick}
          >
            <Marker position={markerPos} draggable={true} onDragEnd={handleMarkerDragEnd} />
          </GoogleMap>
        </LoadScript>
      ) : (
        /* Fallback Peta Interaktif Ringan jika belum punya Google Maps API Key */
        <iframe
          title="Google Maps Location Picker"
          width="100%"
          height="220"
          style={{ border: '0', borderRadius: '8px', marginTop: '6px' }}
          src={`https://maps.google.com/maps?q=${markerPos.lat},${markerPos.lng}&z=13&output=embed`}
        />
      )}
    </div>
  );
}