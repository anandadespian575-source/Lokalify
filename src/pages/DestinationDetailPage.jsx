import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiService } from '../services/api';
import Gallery from '../components/Gallery';
import OpeningHours from '../components/OpeningHours';
import { Heart, MapPin, Star, Ticket } from 'lucide-react';

export default function DestinationDetailPage({ wishlist, onToggleWishlist }) {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    apiService.getDestinationById(id).then(setDestination);
  }, [id]);

  if (!destination) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;

  const isWishlisted = wishlist.some(w => w.id === destination.id);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', marginTop: '20px' }}>
      {/* Left Main Content */}
      <div>
        <Gallery gallery={destination.gallery} />

        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', marginTop: '20px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>Description</h2>
          <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '14px' }}>
            {destination.description}
          </p>

          <h3 style={{ fontSize: '16px', fontWeight: '700', marginTop: '20px', marginBottom: '10px' }}>Fasilitas</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {destination.facilities?.map((f, i) => (
              <span key={i} style={{ backgroundColor: '#F1F5F9', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', color: '#334155' }}>
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '20px', fontWeight: '800' }}>{destination.name}</h1>
            <button 
              className={`heart-btn ${isWishlisted ? 'active' : ''}`}
              onClick={() => onToggleWishlist(destination)}
            >
              <Heart size={18} color={isWishlisted ? '#EF4444' : '#64748B'} fill={isWishlisted ? '#EF4444' : 'none'} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '13px', marginTop: '8px' }}>
            <MapPin size={14} /> {destination.address}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '14px', fontWeight: '700' }}>
            <Star size={16} color="#F59E0B" fill="#F59E0B" /> {destination.rating} ({destination.reviews_count} reviews)
          </div>

          <div style={{ marginTop: '16px', fontSize: '20px', fontWeight: '800', color: '#2563EB' }}>
            {destination.price_formatted}
          </div>

          <button className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>
            Simpan ke Wishlist
          </button>
        </div>

        <OpeningHours hours={destination.opening_hours} />
      </div>
    </div>
  );
}