import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 1. Inisialisasi Pusher
    // Tips: Simpan key di file .env (VITE_PUSHER_APP_KEY / NEXT_PUBLIC_PUSHER_APP_KEY)
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY || 'KEY_PUSHER_KAMU', {
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER || 'ap1',
    });

    // 2. Subscribe ke Public Channel
    const channel = pusher.subscribe('lokalify-chat');

    // 3. Listen event pesan masuk dari Server / Backend
    channel.bind('pesan-baru', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe('lokalify-chat');
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const payload = {
      username: username.trim() || 'Anonim',
      message: message.trim(),
    };

    // Kosongkan input pesan
    setMessage('');

    // Send ke Backend API kamu agar Backend meluncurkan trigger ke Pusher
    try {
      await fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error('Gagal mengirim pesan:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto my-5 p-4 bg-slate-900 border border-slate-800 rounded-xl text-white shadow-xl">
      <h3 className="text-lg font-bold mb-3 text-amber-400">Lokalify Chat Room</h3>
      
      {/* Box Pesan */}
      <div className="h-64 overflow-y-auto bg-black border border-slate-800 rounded-lg p-3 mb-3 space-y-2">
        {messages.length === 0 ? (
          <p className="text-xs text-slate-500 text-center mt-20">Belum ada pesan...</p>
        ) : (
          messages.map((item, index) => (
            <div key={index} className="bg-slate-800/80 p-2 rounded border border-slate-700/50 text-xs">
              <span className="font-bold text-amber-400">{item.username}: </span>
              <span className="text-slate-200">{item.message}</span>
            </div>
          ))
        )}
      </div>

      {/* Form Kirim */}
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          placeholder="Nama..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-1/3 p-2 bg-slate-800 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-amber-500"
        />
        <input
          type="text"
          placeholder="Tulis pesan..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-1/2 p-2 bg-slate-800 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-amber-500"
        />
        <button 
          type="submit" 
          className="w-1/6 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs rounded transition"
        >
          Kirim
        </button>
      </form>
    </div>
  );
}