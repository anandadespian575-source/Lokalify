import React, { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setIsLoading(true);

        try {
            const res = await axios.post('/api/login', { username, password });
            
            if (res.data.success) {
                alert(`Login Berhasil! Selamat datang, ${res.data.role.toUpperCase()}`);
                window.location.href = res.data.redirect;
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setErrorMsg(err.response.data.message);
            } else {
                setErrorMsg('Terjadi kesalahan pada koneksi server.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-blue-600">Lokalify</h1>
                    <p className="text-slate-500 text-sm mt-1">Masuk untuk menjelajahi keindahan wisata lokal</p>
                </div>
                
                {errorMsg && (
                    <div className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-600 font-medium border border-red-100 text-center">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Username</label>
                        <input 
                            type="text" 
                            className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all" 
                            placeholder="Masukkan username..."
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                        <input 
                            type="password" 
                            className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all" 
                            placeholder="Masukkan password..."
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full rounded-xl bg-blue-600 p-3.5 font-bold text-white transition-all hover:bg-blue-700 active:scale-[0.99] shadow-lg shadow-blue-200 disabled:opacity-50"
                    >
                        {isLoading ? 'Memproses...' : 'Masuk'}
                    </button>
                </form>
            </div>
        </div>
    );
}