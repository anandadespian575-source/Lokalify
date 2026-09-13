import React from 'react';

export default function DestinationDetailTab({ 
  selectedDestination, 
  onBack, 
  currentUser, 
  newRating, 
  setNewRating, 
  newComment, 
  setNewComment, 
  handleAddReview 
}) {
  if (!selectedDestination) return null;

  return (
    <main style={{ padding: '32px 24px', maxWidth: '1000px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      {/* Tombol Kembali ke Dashboard */}
      <button
        onClick={onBack}
        style={{
          padding: '12px 22px',
          backgroundColor: '#0066FF',
          color: '#FFF',
          border: 'none',
          borderRadius: '12px',
          fontWeight: '700',
          fontSize: '14px',
          cursor: 'pointer',
          marginBottom: '24px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 14px rgba(0,102,255,0.25)',
          transition: 'transform 0.2s'
        }}
      >
        ⬅️ Kembali ke Dashboard
      </button>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0' }}>
        <img 
          src={selectedDestination.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'} 
          alt={selectedDestination.title} 
          style={{ width: '100%', height: '420px', objectFit: 'cover' }} 
        />

        <div style={{ padding: '36px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ backgroundColor: '#EFF6FF', color: '#0066FF', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '800' }}>
                {selectedDestination.category || 'Wisata'}
              </span>
              <h1 style={{ fontSize: '30px', fontWeight: '900', color: '#1E293B', margin: '12px 0 6px 0' }}>
                {selectedDestination.title}
              </h1>
              <p style={{ color: '#64748B', fontSize: '15px', margin: 0 }}>
                📍 {selectedDestination.location}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '13px', color: '#64748B' }}>Tiket Masuk:</span>
              <div style={{ fontSize: '26px', fontWeight: '900', color: '#10B981' }}>
                Rp {selectedDestination.price ? Number(selectedDestination.price).toLocaleString('id-ID') : 'Gratis'}
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '24px 0' }} />

          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1E293B' }}>Deskripsi Tempat Wisata</h3>
          <p style={{ color: '#334155', fontSize: '15px', lineHeight: '1.8' }}>
            {selectedDestination.description || 'Tidak ada deskripsi rinci untuk tempat wisata ini.'}
          </p>

          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1E293B', marginTop: '28px' }}>Fasilitas & Jam Operasional</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '12px 0' }}>
            {Array.isArray(selectedDestination.facilities) ? (
              selectedDestination.facilities.map((fac, idx) => (
                <span key={idx} style={{ backgroundColor: '#F1F5F9', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', color: '#475569', fontWeight: '600' }}>
                  ✓ {fac}
                </span>
              ))
            ) : (
              <span style={{ backgroundColor: '#F1F5F9', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', color: '#475569', fontWeight: '600' }}>✓ Parkir, Toilet, & Kantin</span>
            )}
          </div>
          <p style={{ fontSize: '14px', color: '#64748B', marginTop: '8px' }}>
            ⏰ Jam Buka: <b>{selectedDestination.hours || '08:00 - 17:00 WIB'}</b>
          </p>

          <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '28px 0' }} />

          {/* Sistem Ulasan Supabase */}
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1E293B' }}>
            Ulasan Pengunjung ({selectedDestination.reviews?.length || 0})
          </h3>

          <form onSubmit={handleAddReview} style={{ marginTop: '16px', backgroundColor: '#F8FAFC', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Rating:</span>
              <select value={newRating} onChange={(e) => setNewRating(e.target.value)} style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
                <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                <option value="4">⭐⭐⭐⭐ (4/5)</option>
                <option value="3">⭐⭐⭐ (3/5)</option>
                <option value="2">⭐⭐ (2/5)</option>
                <option value="1">⭐ (1/5)</option>
              </select>
            </div>
            <textarea 
              value={newComment} 
              onChange={(e) => setNewComment(e.target.value)} 
              placeholder="Tulis ulasan pengalaman kamu di sini..." 
              rows={3} 
              required 
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }} 
            />
            <button type="submit" style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#0066FF', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              Kirim Ulasan
            </button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
            {selectedDestination.reviews?.map((rev, index) => (
              <div key={index} style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#1E293B' }}>{rev.user}</span>
                  <span style={{ fontSize: '12px', color: '#F59E0B' }}>{'⭐'.repeat(rev.rating)}</span>
                </div>
                <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#475569' }}>{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}