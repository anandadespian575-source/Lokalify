import React from 'react';

export default function DestinationCard({ item, setSelectedDestination, currentUser, onEdit, onDelete }) {
  return (
    <div
      onClick={() => setSelectedDestination(item)}
      style={{
        backgroundColor: '#FFF',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #E2E8F0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      <img
        src={item.image}
        alt={item.title}
        style={{ width: '100%', height: '120px', objectFit: 'cover' }}
      />
      
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        <span style={{ fontSize: '10px', backgroundColor: '#EFF6FF', color: '#0066FF', padding: '2px 6px', borderRadius: '4px', width: 'fit-content', fontWeight: 'bold' }}>
          {item.category}
        </span>
        <h4 style={{ margin: '4px 0 0 0', fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{item.title}</h4>
        <p style={{ margin: 0, fontSize: '11px', color: '#64748B' }}>📍 {item.location}</p>
        <p style={{ margin: '4px 0 0 0', fontSize: '12px', fontWeight: '800', color: '#10B981' }}>
          Rp {item.price.toLocaleString('id-ID')} / orang
        </p>

        {/* TOMBOL EDIT & HAPUS WISATA UNTUK ADMIN */}
        {currentUser?.role === 'admin' && (
          <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => onEdit(item)}
              style={{ flex: 1, backgroundColor: '#F59E0B', color: '#FFF', border: 'none', padding: '6px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => onDelete(item.id)}
              style={{ flex: 1, backgroundColor: '#EF4444', color: '#FFF', border: 'none', padding: '6px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              🗑️ Hapus
            </button>
          </div>
        )}
      </div>
    </div>
  );
}