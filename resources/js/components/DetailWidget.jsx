import React, { useState } from 'react';

export default function DetailWidget({ selectedDestination, currentUser, onAddReview }) {
  const [rating, setRating] = useState(5);
  const [commentText, setCommentText] = useState('');
  const [reviewImage, setReviewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  if (!selectedDestination) {
    return (
      <div style={{ backgroundColor: '#FFF', borderRadius: '14px', padding: '20px', border: '1px solid #E2E8F0', textAlign: 'center', color: '#64748B' }}>
        Pilih salah satu destinasi wisata untuk melihat detail.
      </div>
    );
  }

  // Handle pilih gambar ulasan
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReviewImage(reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Rating & Komentar
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Silakan login terlebih dahulu untuk memberikan ulasan!');
      return;
    }
    if (!commentText.trim()) {
      alert('Mohon isi pesan komentar Anda!');
      return;
    }

    const newReview = {
      id: Date.now(),
      userName: currentUser.name || currentUser.email.split('@')[0],
      userRole: currentUser.role,
      rating: Number(rating),
      comment: commentText,
      photo: reviewImage || null,
      createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    onAddReview(selectedDestination.id, newReview);
    setCommentText('');
    setReviewImage(null);
    setImagePreview('');
    alert('✅ Ulasan & Foto Anda berhasil ditambahkan!');
  };

  const reviews = selectedDestination.reviews || [];
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 'Belum Ada';

  return (
    <div style={{ backgroundColor: '#FFF', borderRadius: '14px', padding: '20px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Detail Gambar & Info Utama */}
      <div>
        <img
          src={selectedDestination.image}
          alt={selectedDestination.title}
          style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '10px', marginBottom: '12px' }}
        />
        <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>
          {selectedDestination.title}
        </h3>
        <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span>📍 {selectedDestination.location}</span>
          <span>•</span>
          <span style={{ color: '#EAB308', fontWeight: 'bold' }}>⭐ {avgRating} ({reviews.length} Ulasan)</span>
        </div>
        <div style={{ fontSize: '15px', fontWeight: '800', color: '#0066FF' }}>
          Tiket: {selectedDestination.price === 0 ? 'Gratis' : `Rp${Number(selectedDestination.price).toLocaleString('id-ID')}`}
        </div>
      </div>

      <p style={{ fontSize: '12px', color: '#475569', lineHeight: '1.5', margin: 0 }}>
        {selectedDestination.description}
      </p>

      {/* Rute Google Maps Direct */}
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedDestination.title + ' ' + selectedDestination.location)}`}
        target="_blank"
        rel="noreferrer"
        style={{ display: 'block', textAlign: 'center', backgroundColor: '#10B981', color: '#FFF', textDecoration: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px' }}
      >
        🗺️ Buka Rute Lokasi di Google Maps
      </a>

      <hr style={{ border: 'none', borderTop: '1px solid #F1F5F9', margin: '4px 0' }} />

      {/* Form Tambah Ulasan & Foto Galeri */}
      <div>
        <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>💬 Tulis Ulasan & Bagikan Foto</h4>
        {currentUser ? (
          <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: '600', color: '#475569' }}>Beri Rating:</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px', marginTop: '2px' }}
              >
                <option value={5}>⭐⭐⭐⭐⭐ (Sangat Bagus)</option>
                <option value={4}>⭐⭐⭐⭐ (Bagus)</option>
                <option value={3}>⭐⭐⭐ (Cukup)</option>
                <option value={2}>⭐⭐ (Kurang)</option>
                <option value={1}>⭐ (Sangat Buruk)</option>
              </select>
            </div>

            <div>
              <textarea
                rows={3}
                required
                placeholder="Bagikan pengalaman Anda tentang tempat wisata ini..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '2px' }}>📷 Bagikan Foto ke Galeri Komentar:</label>
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ fontSize: '11px' }} />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px', marginTop: '6px' }} />
              )}
            </div>

            <button type="submit" style={{ backgroundColor: '#0066FF', color: '#FFF', border: 'none', padding: '8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
              Kirim Ulasan
            </button>
          </form>
        ) : (
          <p style={{ fontSize: '11px', color: '#EF4444', backgroundColor: '#FEE2E2', padding: '8px', borderRadius: '6px', margin: 0 }}>
            Silakan login untuk menambahkan rating dan foto komentar.
          </p>
        )}
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #F1F5F9', margin: '4px 0' }} />

      {/* Daftar Komentar & Galeri Foto Pengunjung */}
      <div>
        <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>
          ⭐ Galeri & Ulasan Pengunjung ({reviews.length})
        </h4>

        {reviews.length === 0 ? (
          <p style={{ fontSize: '12px', color: '#94A3B8', fontStyle: 'italic' }}>Belum ada ulasan. Jadilah yang pertama memberikan penilaian!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '280px', overflowY: 'auto' }}>
            {reviews.map((rev) => (
              <div key={rev.id} style={{ backgroundColor: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0F172A' }}>
                    {rev.userName}
                    {rev.userRole === 'admin' && <span style={{ fontSize: '9px', backgroundColor: '#0066FF', color: '#FFF', padding: '1px 5px', borderRadius: '4px', marginLeft: '4px' }}>ADMIN</span>}
                  </span>
                  <span style={{ fontSize: '11px', color: '#EAB308' }}>{'⭐'.repeat(rev.rating)}</span>
                </div>
                <p style={{ fontSize: '12px', color: '#334155', margin: '0 0 6px 0', lineHeight: '1.4' }}>{rev.comment}</p>
                {rev.photo && (
                  <img src={rev.photo} alt="Foto Pengunjung" style={{ width: '100%', maxHeight: '140px', objectFit: 'cover', borderRadius: '6px', marginTop: '4px' }} />
                )}
                <span style={{ fontSize: '10px', color: '#94A3B8', display: 'block', marginTop: '4px' }}>{rev.createdAt}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}