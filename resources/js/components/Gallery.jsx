import React, { useState } from 'react';

export default function Gallery({ gallery = [] }) {
  const [selectedImage, setSelectedImage] = useState(gallery[0] || '');

  if (!gallery.length) return null;

  return (
    <div>
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>Galeri Destinasi</h3>
      {/* Main Image */}
      <div style={{ height: '300px', borderRadius: '16px', overflow: 'hidden', marginBottom: '12px' }}>
        <img 
          src={selectedImage || gallery[0]} 
          alt="Main Gallery" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>

      {/* Thumbnails */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
        {gallery.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumbnail ${idx}`}
            onClick={() => setSelectedImage(img)}
            style={{
              width: '80px',
              height: '60px',
              borderRadius: '8px',
              objectFit: 'cover',
              cursor: 'pointer',
              border: selectedImage === img ? '2px solid #2563EB' : '2px solid transparent',
              opacity: selectedImage === img ? 1 : 0.7
            }}
          />
        ))}
      </div>
    </div>
  );
}