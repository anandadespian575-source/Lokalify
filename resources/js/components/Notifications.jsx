import React, { useState } from 'react';

export default function Notifications() {
  const [notifications] = useState([
    { id: 1, text: '🎉 Selamat datang di aplikasi Lokalify!', time: 'Baru saja' },
    { id: 2, text: '📢 Update destinasi baru telah ditambahkan.', time: '1 jam lalu' }
  ]);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 90 }}>
      {/* Button Floating Notifikasi */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '50%',
          width: '42px',
          height: '42px',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        🔔
        {notifications.length > 0 && (
          <span style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            backgroundColor: '#EF4444',
            color: '#FFF',
            fontSize: '10px',
            fontWeight: 'bold',
            borderRadius: '50%',
            width: '16px',
            height: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown List Notifikasi */}
      {showDropdown && (
        <div style={{
          position: 'absolute',
          right: 0,
          marginTop: '8px',
          width: '280px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #E2E8F0', fontWeight: 'bold', fontSize: '13px', color: '#1E293B' }}>
            Notifikasi Saya
          </div>
          <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
            {notifications.map((item) => (
              <div key={item.id} style={{ padding: '12px 16px', borderBottom: '1px solid #F1F5F9', fontSize: '12px' }}>
                <p style={{ margin: 0, color: '#334155', fontWeight: '500' }}>{item.text}</p>
                <span style={{ fontSize: '10px', color: '#94A3B8', marginTop: '4px', display: 'block' }}>{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}