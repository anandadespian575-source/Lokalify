import React from 'react';
import { Clock } from 'lucide-react';

export default function OpeningHours({ hours }) {
  // Hitung status BUKA / TUTUP berdasarkan waktu lokal Indonesia
  const checkIsOpen = () => {
    if (!hours || !hours.open || !hours.close) return true;
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const [openH, openM] = hours.open.split(':').map(Number);
    const [closeH, closeM] = hours.close.split(':').map(Number);

    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;

    return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
  };

  const isOpen = checkIsOpen();

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
      border: '1px solid #E2E8F0'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={18} color="#2563EB" /> Jam Operasional
        </h4>
        <span style={{
          fontSize: '12px',
          fontWeight: '700',
          padding: '4px 12px',
          borderRadius: '9999px',
          backgroundColor: isOpen ? '#DCFCE7' : '#FEE2E2',
          color: isOpen ? '#166534' : '#991B1B'
        }}>
          {isOpen ? 'BUKA SEKARANG' : 'TUTUP'}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#475569' }}>
        {hours?.days?.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{item.day}</span>
            <span style={{ fontWeight: '600' }}>{item.hours}</span>
          </div>
        ))}
      </div>
    </div>
  );
}