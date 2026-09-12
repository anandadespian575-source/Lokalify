import React from 'react';

export default function AdminPanel({
  editingId,
  uploadStatus,
  handleSaveDestination,
  newTitle,
  setNewTitle,
  newCategory,
  setNewCategory,
  categories,
  newLocation,
  setNewLocation,
  newPrice,
  setNewPrice,
  newHours,
  setNewHours,
  newFacilities,
  setNewFacilities,
  setNewImageFile,
  newImageUrl,
  setNewImageUrl,
  newDesc,
  setNewDesc,
  resetForm,
  setShowAdminPanel
}) {
  return (
    <section style={styles.adminSection}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>🛠️ {editingId ? 'Edit Data Wisata' : 'Tambah Wisata Ciwidey Baru'} (Admin)</h2>
        <button
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', fontWeight: 'bold' }}
          onClick={() => {
            resetForm();
            setShowAdminPanel(false);
          }}
        >
          ✕ Batal
        </button>
      </div>

      {uploadStatus && (
        <div
          style={{
            marginTop: '12px',
            padding: '10px 12px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '600',
            backgroundColor: uploadStatus.type === 'error' ? '#FEE2E2' : '#DBEAFE',
            color: uploadStatus.type === 'error' ? '#991B1B' : '#1D4ED8'
          }}
        >
          {uploadStatus.msg}
        </div>
      )}

      <form onSubmit={handleSaveDestination} style={styles.adminForm}>
        <input
          type="text"
          placeholder="Nama Destinasi Wisata *"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={styles.adminInput}
          required
        />
        <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} style={styles.adminInput}>
          {categories.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Alamat / Lokasi Lengkap *"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          style={{ ...styles.adminInput, flex: '2 min-width 300px' }}
          required
        />
        <input
          type="number"
          placeholder="Harga Tiket Masuk (Rp) *"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          style={styles.adminInput}
          required
        />
        <input
          type="text"
          placeholder="Jam Operasional (misal: 07:00 - 17:00)"
          value={newHours}
          onChange={(e) => setNewHours(e.target.value)}
          style={styles.adminInput}
        />
        <input
          type="text"
          placeholder="Fasilitas (pisahkan dengan koma: Toilet, Parkir, Mushola)"
          value={newFacilities}
          onChange={(e) => setNewFacilities(e.target.value)}
          style={{ ...styles.adminInput, width: '100%' }}
        />
        <div style={{ width: '100%', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewImageFile(e.target.files[0] || null)}
            style={{ ...styles.adminInput, flex: 1 }}
          />
          <span style={{ fontSize: '12px', color: '#64748B' }}>atau Gunakan URL Foto:</span>
          <input
            type="text"
            placeholder="https://images.unsplash.com/..."
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            style={{ ...styles.adminInput, flex: 1 }}
          />
        </div>
        <textarea
          placeholder="Deskripsi Lengkap Informasi Wisata..."
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          style={{ ...styles.adminInput, width: '100%', height: '70px' }}
        />
        <button type="submit" className="btn-hover" style={styles.addBtn}>
          💾 {editingId ? 'Simpan Perubahan Wisata' : 'Tambahkan Wisata Sekarang'}
        </button>
      </form>
    </section>
  );
}

const styles = {
  adminSection: {
    backgroundColor: '#EFF6FF',
    padding: '20px 32px',
    borderBottom: '2px solid #BFDBFE'
  },
  adminForm: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '12px'
  },
  adminInput: {
    padding: '9px 12px',
    borderRadius: '8px',
    border: '1px solid #CBD5E1',
    fontSize: '13px',
    flex: '1 min-width 180px'
  },
  addBtn: {
    backgroundColor: '#10B981',
    color: '#FFF',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};