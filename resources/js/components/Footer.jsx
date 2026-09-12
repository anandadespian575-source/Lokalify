import React from 'react';
import { MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#ffffff', borderTop: '1px solid #E2E8F0', marginTop: '60px', padding: '40px 0 20px 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', paddingBottom: '30px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{ backgroundColor: '#2563EB', borderRadius: '50%', padding: '6px', color: '#fff', display: 'flex' }}>
              <MapPin size={16} />
            </div>
            <span style={{ fontSize: '18px', fontWeight: '800' }}>Lokalify</span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748B' }}>
            Temukan destinasi lokal dan nikmati pengalaman wisata yang lebih dekat.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>Navigasi</h4>
          <ul style={{ listStyle: 'none', fontSize: '13px', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><a href="/destinasi">Destinasi</a></li>
            <li><a href="/kategori">Kategori</a></li>
            <li><a href="/peta">Peta</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>Komunitas</h4>
          <ul style={{ listStyle: 'none', fontSize: '13px', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><a href="/review">Review</a></li>
            <li><a href="/wishlist">Wishlist</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>Kontak</h4>
          <p style={{ fontSize: '13px', color: '#64748B' }}>info@lokalify.id</p>
          <p style={{ fontSize: '13px', color: '#64748B' }}>+62 812 3456 7890</p>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #F1F5F9', textAlign: 'center', paddingTop: '20px', fontSize: '12px', color: '#94A3B8' }}>
        © 2026 Lokalify. All rights reserved.
      </div>
    </footer>
  );
}