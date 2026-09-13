import React from 'react';

export default function MapSection({ destinations = [], onSelectDestination }) {
  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '20px',
      padding: '24px',
      border: '1px solid #E2E8F0',
      boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
      marginBottom: '32px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#1E293B' }}>
            🗺️ Peta Interaktif Destinasi
          </h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Jelajahi lokasi wisata terdekat langsung di peta
          </p>
        </div>
        <span style={{ fontSize: '12px', fontWeight: '700', backgroundColor: '#EFF6FF', color: '#0066FF', padding: '6px 12px', borderRadius: '12px' }}>
          {destinations.length} Lokasi Terdeteksi
        </span>
      </div>

      {/* Frame Tampilan Peta */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '320px',
        backgroundColor: '#E2E8F0',
        borderRadius: '14px',
        overflow: 'hidden',
        border: '1px solid #CBD5E1'
      }}>
        <iframe
          title="Lokalify Map View"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://maps.google.com/maps?q=Ciwidey,Bandung&t=&z=12&ie=UTF8&iwloc=&output=embed"
          style={{ filter: 'contrast(1.05)' }}
        ></iframe>

        {/* Overlay Quick Selector */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          right: '12px',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          padding: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          {destinations.slice(0, 5).map((dest) => (
            <button
              key={dest.id}
              onClick={() => onSelectDestination(dest)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFF',
                color: '#1E293B',
                fontWeight: '700',
                fontSize: '12px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              📍 {dest.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}