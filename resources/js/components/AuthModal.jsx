import React, { useState } from 'react';

export default function AuthModal({ onClose, setCurrentUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    // Simulasi Login Admin & User
    const role = email.includes('admin') ? 'admin' : 'user';
    const userObj = {
      displayName: name || email.split('@')[0],
      email: email,
      role: role
    };

    setCurrentUser(userObj);
    alert(`Berhasil ${isLogin ? 'Masuk' : 'Mendaftar'} sebagai ${role.toUpperCase()}!`);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '380px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#1E293B' }}>
            {isLogin ? '🔑 Masuk ke Lokalify' : '📝 Daftar Akun Baru'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748B' }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {!isLogin && (
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>Nama Lengkap</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Nama kamu" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', marginTop: '4px', boxSizing: 'border-box' }} />
            </div>
          )}

          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>Alamat Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="nama@email.com" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', marginTop: '4px', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>Kata Sandi</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', marginTop: '4px', boxSizing: 'border-box' }} />
          </div>

          <button type="submit" style={{ padding: '12px', backgroundColor: '#0066FF', color: '#FFF', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' }}>
            {isLogin ? 'Masuk Sekarang' : 'Daftar Akun'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#64748B', marginTop: '16px' }}>
          {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
          <span onClick={() => setIsLogin(!isLogin)} style={{ color: '#0066FF', fontWeight: 'bold', cursor: 'pointer' }}>
            {isLogin ? 'Daftar' : 'Masuk'}
          </span>
        </p>
      </div>
    </div>
  );
}