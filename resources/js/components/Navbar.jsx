import React from 'react';

export default function Navbar({ 
  currentUser, 
  setCurrentUser, 
  onOpenAuth, 
  onOpenBugBot, 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery 
}) {
  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('beranda');
    alert('Kamu telah berhasil keluar.');
  };

  return (
    <nav style={{
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E2E8F0',
      padding: '14px 24px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        {/* Logo & Brand */}
        <div 
          onClick={() => setActiveTab('beranda')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        >
          <span style={{ fontSize: '24px' }}>🗺️</span>
          <span style={{ fontSize: '20px', fontWeight: '900', color: '#0066FF', letterSpacing: '-0.5px' }}>
            Lokalify
          </span>
        </div>

        {/* Search Bar */}
        {activeTab === 'beranda' && (
          <div style={{ flex: '1', maxWidth: '400px', position: 'relative' }}>
            <input
              type="text"
              placeholder="Cari destinasi wisata atau lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 16px 10px 38px',
                borderRadius: '20px',
                border: '1px solid #CBD5E1',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: '#F8FAFC',
                boxSizing: 'border-box'
              }}
            />
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}>
              🔍
            </span>
          </div>
        )}

        {/* Action Buttons & Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setActiveTab('beranda')}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: activeTab === 'beranda' ? '#EFF6FF' : 'transparent',
              color: activeTab === 'beranda' ? '#0066FF' : '#475569',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Beranda
          </button>

          {currentUser?.role === 'admin' && (
            <button
              onClick={() => setActiveTab('admin')}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: activeTab === 'admin' ? '#EFF6FF' : 'transparent',
                color: activeTab === 'admin' ? '#0066FF' : '#475569',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Admin Panel
            </button>
          )}

          <button
            onClick={onOpenBugBot}
            style={{
              padding: '8px 14px',
              border: '1px solid #FECDD3',
              borderRadius: '8px',
              backgroundColor: '#FFF1F2',
              color: '#E11D48',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            🐛 Lapor Bug
          </button>

          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#334155' }}>
                👤 {currentUser.displayName || currentUser.name || 'User'}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  padding: '8px 14px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  backgroundColor: '#FFF',
                  color: '#64748B',
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Keluar
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              style={{
                padding: '8px 18px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#0066FF',
                color: '#FFF',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,102,255,0.2)'
              }}
            >
              Masuk / Daftar
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}