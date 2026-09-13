import React, { useState } from 'react';

export default function BugBotModal({ onClose }) {
  const [bugDescription, setBugDescription] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bugDescription.trim()) return;

    setIsSent(true);
    setTimeout(() => {
      alert('🐛 Laporan kendala berhasil dikirim ke tim developer!');
      setIsSent(false);
      setBugDescription('');
      onClose();
    }, 1000);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '28px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#E11D48' }}>
            🐛 Lapor Bug / Kendala
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748B' }}>✕</button>
        </div>

        <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 16px 0' }}>
          Temukan error atau masalah tampilan? Beritahu tim kami agar segera diperbaiki.
        </p>

        <form onSubmit={handleSubmit}>
          <textarea
            value={bugDescription}
            onChange={(e) => setBugDescription(e.target.value)}
            rows={4}
            required
            placeholder="Jelaskan secara singkat kendala yang kamu temukan..."
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box', marginBottom: '16px' }}
          />

          <button
            type="submit"
            disabled={isSent}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#E11D48',
              color: '#FFF',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {isSent ? 'Mengirim Laporan...' : 'Kirim Laporan Bug'}
          </button>
        </form>
      </div>
    </div>
  );
}