import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MapPin, Search, Heart } from 'lucide-react';

export default function Navbar({ wishlistCount = 0 }) {
  const navigate = useNavigate();

  return (
    <header style={{
      position: 'sticky',
      top: '16px',
      zIndex: 1000,
      padding: '0 20px',
      marginBottom: '24px'
    }}>
      <nav style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '9999px',
        padding: '12px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
      }}>
        {/* Logo */}
        <div 
          onClick={() => navigate('/')} 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        >
          <div style={{
            backgroundColor: '#2563EB',
            borderRadius: '50%',
            padding: '8px',
            color: '#fff',
            display: 'flex'
          }}>
            <MapPin size={20} />
          </div>
          <span style={{ fontSize: '20px', fontWeight: '800', color: '#1E293B' }}>Lokalify</span>
        </div>

        {/* Menu Links */}
        <div style={{ display: 'flex', gap: '28px', fontSize: '14px', fontWeight: '600', color: '#475569' }}>
          <NavLink to="/destinasi" style={({ isActive }) => ({ color: isActive ? '#2563EB' : 'inherit' })}>Destinasi</NavLink>
          <NavLink to="/kategori" style={({ isActive }) => ({ color: isActive ? '#2563EB' : 'inherit' })}>Kategori</NavLink>
          <NavLink to="/peta" style={({ isActive }) => ({ color: isActive ? '#2563EB' : 'inherit' })}>Peta</NavLink>
          <NavLink to="/review" style={({ isActive }) => ({ color: isActive ? '#2563EB' : 'inherit' })}>Review</NavLink>
          <NavLink to="/wishlist" style={({ isActive }) => ({ color: isActive ? '#2563EB' : 'inherit', position: 'relative' })}>
            Wishlist
            {wishlistCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-14px',
                backgroundColor: '#EF4444',
                color: '#fff',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>{wishlistCount}</span>
            )}
          </NavLink>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => navigate('/destinasi')} 
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748B' }}
          >
            <Search size={20} />
          </button>
          <button className="btn-primary">Masuk</button>
        </div>
      </nav>
    </header>
  );
}