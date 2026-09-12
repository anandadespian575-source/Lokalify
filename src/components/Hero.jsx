import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function Hero() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/destinasi?search=${encodeURIComponent(query)}`);
  };

  return (
    <div style={{
      position: 'relative',
      borderRadius: '24px',
      overflow: 'hidden',
      height: '380px',
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: '#ffffff',
      padding: '0 20px',
      marginBottom: '36px'
    }}>
      <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px', lineHeight: '1.2' }}>
        Jelajahi lebih dekat,<br />temukan yang lokal.
      </h1>
      <p style={{ fontSize: '15px', color: '#F1F5F9', marginBottom: '28px', maxWidth: '580px' }}>
        Temukan berbagai destinasi wisata lokal, informasi lengkap, dan pengalaman menarik di sekitar Anda.
      </p>

      {/* Pill Search Form */}
      <form onSubmit={handleSearch} style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: '9999px',
        padding: '6px 8px 6px 20px',
        width: '100%',
        maxWidth: '560px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
      }}>
        <Search size={20} color="#94A3B8" style={{ marginRight: '10px' }} />
        <input 
          type="text" 
          placeholder="Cari destinasi atau tempat wisata..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            width: '100%',
            color: '#1E293B'
          }}
        />
        <button type="submit" className="btn-primary" style={{ padding: '10px 28px' }}>
          Cari
        </button>
      </form>
    </div>
  );
}