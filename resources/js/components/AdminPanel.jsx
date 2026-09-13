import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminPanel({ destinations = [], refreshData }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('Wisata Alam');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('08:00 - 17:00 WIB');
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Submit Handler (Tambah / Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !location) {
      alert('Judul dan Lokasi wajib diisi!');
      return;
    }

    setIsSubmitting(true);
    const payload = {
      title,
      location,
      category,
      price: price ? Number(price) : 0,
      image: image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      description,
      hours
    };

    try {
      if (editingId) {
        // Update Data
        const { error } = await supabase.from('destinations').update(payload).eq('id', editingId);
        if (error) throw error;
        alert('✅ Destinasi berhasil diperbarui!');
      } else {
        // Tambah Data Baru
        const { error } = await supabase.from('destinations').insert([payload]);
        if (error) throw error;
        alert('✅ Destinasi baru berhasil ditambahkan!');
      }

      resetForm();
      refreshData();
    } catch (err) {
      alert('Gagal menyimpan data: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title || '');
    setLocation(item.location || '');
    setCategory(item.category || 'Wisata Alam');
    setPrice(item.price || '');
    setImage(item.image || '');
    setDescription(item.description || '');
    setHours(item.hours || '08:00 - 17:00 WIB');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus destinasi ini?')) return;

    try {
      const { error } = await supabase.from('destinations').delete().eq('id', id);
      if (error) throw error;
      alert('🗑️ Destinasi berhasil dihapus!');
      refreshData();
    } catch (err) {
      alert('Gagal menghapus data: ' + err.message);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setLocation('');
    setCategory('Wisata Alam');
    setPrice('');
    setImage('');
    setDescription('');
    setHours('08:00 - 17:00 WIB');
  };

  return (
    <main style={{ padding: '32px 24px', maxWidth: '1000px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#1E293B', marginBottom: '20px' }}>
        ⚙️ Admin Panel - Kelola Destinasi
      </h1>

      {/* Form Tambah/Edit Destinasi */}
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', marginBottom: '32px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '800', color: '#0066FF' }}>
          {editingId ? '✏️ Edit Destinasi Wisata' : '➕ Tambah Destinasi Wisata Baru'}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#475569' }}>Nama Destinasi *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Contoh: Kawah Putih" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', marginTop: '4px', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#475569' }}>Lokasi / Kecamatan *</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required placeholder="Contoh: Rancabali, Ciwidey" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', marginTop: '4px', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#475569' }}>Kategori</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', marginTop: '4px', boxSizing: 'border-box' }}>
              <option value="Wisata Alam">Wisata Alam</option>
              <option value="Kuliner">Kuliner</option>
              <option value="Budaya">Budaya</option>
              <option value="Rekreasi">Rekreasi</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#475569' }}>Harga Tiket (Rp)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0 untuk Gratis" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', marginTop: '4px', boxSizing: 'border-box' }} />
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '13px', fontWeight: '700', color: '#475569' }}>URL Gambar / Foto</label>
          <input type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', marginTop: '4px', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '13px', fontWeight: '700', color: '#475569' }}>Deskripsi Singkat</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Tuliskan daya tarik utama tempat wisata ini..." style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', marginTop: '4px', boxSizing: 'border-box' }} />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" disabled={isSubmitting} style={{ padding: '10px 20px', backgroundColor: '#0066FF', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            {isSubmitting ? 'Menyimpan...' : editingId ? 'Simpan Perubahan' : 'Tambah Destinasi'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} style={{ padding: '10px 20px', backgroundColor: '#E2E8F0', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              Batal
            </button>
          )}
        </div>
      </form>

      {/* Tabel Data Destinasi */}
      <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1E293B', marginBottom: '12px' }}>
        Daftar Destinasi Terdaftar ({destinations.length})
      </h3>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B' }}>
              <th style={{ padding: '12px 16px' }}>Nama</th>
              <th style={{ padding: '12px 16px' }}>Lokasi</th>
              <th style={{ padding: '12px 16px' }}>Kategori</th>
              <th style={{ padding: '12px 16px' }}>Harga</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 16px', fontWeight: '700', color: '#1E293B' }}>{item.title}</td>
                <td style={{ padding: '12px 16px', color: '#64748B' }}>{item.location}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ backgroundColor: '#EFF6FF', color: '#0066FF', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                    {item.category || 'Wisata'}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', color: '#10B981', fontWeight: 'bold' }}>
                  Rp {item.price ? Number(item.price).toLocaleString('id-ID') : 'Gratis'}
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  <button onClick={() => handleEdit(item)} style={{ padding: '4px 8px', border: '1px solid #CBD5E1', borderRadius: '4px', cursor: 'pointer', marginRight: '6px', backgroundColor: '#FFF' }}>✏️</button>
                  <button onClick={() => handleDelete(item.id)} style={{ padding: '4px 8px', border: '1px solid #FECDD3', backgroundColor: '#FFF1F2', color: '#E11D48', borderRadius: '4px', cursor: 'pointer' }}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}