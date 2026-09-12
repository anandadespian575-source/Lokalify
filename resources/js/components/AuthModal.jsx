import React from 'react';

export default function AuthModal({
  showAuthModal,
  setShowAuthModal,
  handleAuthSubmit,
  authError,
  email,
  setEmail,
  password,
  setPassword,
  isRegister,
  setIsRegister,
  role,
  setRole,
  adminCode,
  setAdminCode,
  handleRegisterSubmit,
  displayName,
  setDisplayName,
  username,
  setUsername
}) {
  if (!showAuthModal) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '12px', width: '90%', maxWidth: '400px' }}>
        <h3 style={{ marginTop: 0 }}>{isRegister ? 'Daftar Akun Baru' : 'Masuk ke Lokalify'}</h3>
        
        {authError && <p style={{ color: '#EF4444', fontSize: '12px', backgroundColor: '#FEE2E2', padding: '8px', borderRadius: '6px' }}>{authError}</p>}

        <form onSubmit={isRegister ? handleRegisterSubmit : handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {isRegister && (
            <>
              <input
                type="text"
                placeholder="Nama Tampilan (Display Name)"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                style={{ padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
              />
              <input
                type="text"
                placeholder="Username Unik (@username)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
              />
            </>
          )}

          <input
            type="text"
            placeholder={isRegister ? "Email" : "Username atau Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
          />

          {isRegister && (
            <>
              <select value={role} onChange={(e) => setRole(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                <option value="user">User Biasa</option>
                <option value="admin">Admin</option>
              </select>

              {role === 'admin' && (
                <input
                  type="password"
                  placeholder="Kode Lisensi Admin Rahasia"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  required
                  style={{ padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                />
              )}
            </>
          )}

          <button type="submit" style={{ backgroundColor: '#0066FF', color: '#FFF', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            {isRegister ? 'Daftar Sekarang' : 'Masuk'}
          </button>
        </form>

        <p style={{ fontSize: '12px', textAlign: 'center', marginTop: '14px' }}>
          {isRegister ? 'Sudah punya akun?' : 'Belum punya akun?'}{' '}
          <span onClick={() => setIsRegister(!isRegister)} style={{ color: '#0066FF', cursor: 'pointer', fontWeight: 'bold' }}>
            {isRegister ? 'Masuk di sini' : 'Daftar di sini'}
          </span>
        </p>

        <button onClick={() => setShowAuthModal(false)} style={{ width: '100%', backgroundColor: '#E2E8F0', border: 'none', padding: '6px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Tutup</button>
      </div>
    </div>
  );
}