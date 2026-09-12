import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Heart } from 'lucide-react';

export default function DestinationCard({ destination, isWishlisted, onToggleWishlist }) {
  const navigate = useNavigate();

  return (
    <div className="card" style={{ cursor: 'pointer' }} onClick={() => navigate(`/destinasi/${destination.id}`)}>
      {/* Image Container */}
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
        <img 
          src={destination.image} 
          alt={destination.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <button 
          className={`heart-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(destination);
          }}
          style={{ position: 'absolute', top: '12px', right: '12px' }}
        >
          <Heart size={18} color={isWishlisted ? '#EF4444' : '#64748B'} fill={isWishlisted ? '#EF4444' : 'none'} />
        </button>
      </div>

      {/* Card Content */}
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1E293B', marginBottom: '2px' }}>
              {destination.name}
            </h3>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '500' }}>
              {destination.category_name}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '700', color: '#1E293B' }}>
            <Star size={14} color="#F59E0B" fill="#F59E0B" />
            <span>{destination.rating}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '10px', color: '#64748B', fontSize: '13px' }}>
          <MapPin size={14} />
          <span>{destination.location}</span>
        </div>

        <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #F1F5F9', fontWeight: '700', color: '#2563EB', fontSize: '15px' }}>
          {destination.price_formatted}
        </div>
      </div>
    </div>
  );
}