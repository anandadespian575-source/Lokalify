import React from 'react';

export default function Navbar({
  currentUser,
  setShowAdminPanel,
  setShowAuthModal,
  setShowProfileModal,
  handleLogout,
  setIsSidebarOpen,
  openChatModal
}) {
  return (
    <header style={{
      backgroundColor: '#FFF',
      borderBottom: '1px solid #E2E8F0',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* TOMBOL GARIS TIGA (HAMBURGER MENU) */}
        <button
          onClick={setIsSidebarOpen}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '22px',
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Buka Menu"
        >
          ☰
        </button>

        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#0066FF', letterSpacing: '-0.5px' }}>
          Lokalify
        </h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {currentUser ? (
          <>
            <button
              onClick={openChatModal}
              style={{
                backgroundColor: '#F1F5F9',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              💬 Chat
            </button>

            {currentUser.role === 'admin' && (
              <button
                onClick={setShowAdminPanel}
                style={{
                  backgroundColor: '#EFF6FF',
                  color: '#0066FF',
                  border: '1px solid #BFDBFE',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                ⚙️ Tambah Wisata
              </button>
            )}

            <button
              onClick={setShowProfileModal}
              style={{
                backgroundColor: '#0066FF',
                color: '#FFF',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              👤 @{currentUser.username}
            </button>

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#FEF2F2',
                color: '#EF4444',
                border: '1px solid #FECACA',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Keluar
            </button>
          </>
        ) : (
          <button
            onClick={() => setShowAuthModal(true)}
            style={{
              backgroundColor: '#0066FF',
              color: '#FFF',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Masuk / Daftar
          </button>
        )}
      </div>
    </header>
  );
}