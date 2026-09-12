import React from 'react';
import { Filter, Tag, MapPin, Tag as PriceTag, Star, Clock } from 'lucide-react';

export default function FilterPanel({ filters, setFilters, categories }) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      padding: '24px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
      border: '1px solid #E2E8F0',
      marginBottom: '24px'
    }}>
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Filter size={20} color="#2563EB" /> Fitur Pencarian & Filter
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        {/* Kategori Filter */}
        <div>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <Tag size={14} /> Kategori
          </label>
          <select 
            value={filters.category} 
            onChange={(e) => setFilters({...filters, category: e.target.value})}
            style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none' }}
          >
            <option value="Semua">Semua Kategori</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <Star size={14} /> Rating Min.
          </label>
          <select 
            value={filters.minRating} 
            onChange={(e) => setFilters({...filters, minRating: e.target.value})}
            style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none' }}
          >
            <option value="">Semua Rating</option>
            <option value="4.0">⭐ 4.0+</option>
            <option value="4.5">⭐ 4.5+</option>
            <option value="4.8">⭐ 4.8+</option>
          </select>
        </div>

        {/* Harga Filter */}
        <div>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <PriceTag size={14} /> Maks. Harga
          </label>
          <select 
            value={filters.maxPrice} 
            onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
            style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none' }}
          >
            <option value="">Semua Harga</option>
            <option value="30000">&lt; Rp 30.000</option>
            <option value="50000">&lt; Rp 50.000</option>
            <option value="100000">&lt; Rp 100.000</option>
          </select>
        </div>
      </div>
    </div>
  );
}