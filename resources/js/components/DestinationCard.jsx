import React from 'react';

export default function DestinationCard({ item, setSelectedDestination, currentUser, onEdit, onDelete }) {
  return (
    <div 
      onClick={() => setSelectedDestination(item)}
      style={{ 
        backgroundColor: '#FFF', 
        borderRadius: '16px', 
        overflow: 'hidden', 
        border: '1px solid #E2E8F0', 
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
        transition: 'transform 0.2s, box-shadow 0.2s'
      }}
    >
      <img 
        src={item.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'} 
        alt={item.title} 
        style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
      />
      <div style={{ padding: '16px' }}>
        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#0066FF', backgroundColor: '#EFF6FF', padding: '4px 8px', borderRadius: '6px' }}>
          {item.category || 'Wisata'}
        </span>
        <h4 style={{ margin: '8px 0 4px 0', fontSize: '16px', fontWeight: '800', color: '#1E293B' }}>{item.title}</h4>
        <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 12px 0' }}>📍 {item.location}</p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', fontWeight: '800', color: '#10B981' }}>
            Rp {item.price ? Number(item.price).toLocaleString('id-ID') : 'Gratis'}
          </span>
          {currentUser?.role === 'admin' && (
            <div style={{ display: 'flex', gap: '6px' }} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => onEdit(item)} style={{ padding: '4px 8px', fontSize: '12px', border: '1px solid #CBD5E1', borderRadius: '4px', cursor: 'pointer' }}>✏️</button>
              <button onClick={() => onDelete(item.id)} style={{ padding: '4px 8px', fontSize: '12px', border: '1px solid #FECDD3', backgroundColor: '#FFF1F2', color: '#E11D48', borderRadius: '4px', cursor: 'pointer' }}>🗑️</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}