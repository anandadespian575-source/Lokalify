import React, { useState } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Halo! Ada yang bisa kami bantu mengenai tempat wisata lokal?', sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = { id: Date.now(), text: inputMessage, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    // Simulasi Balasan Otomatis
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: 'Terima kasih telah menghubungi Lokalify! Tim kami atau asisten AI akan membalas pesanmu secepatnya.',
          sender: 'bot'
        }
      ]);
    }, 1000);
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}>
      {/* Pop-up Box Chat */}
      {isOpen && (
        <div style={{
          width: '320px',
          height: '420px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          border: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '12px',
          overflow: 'hidden'
        }}>
          {/* Header Widget */}
          <div style={{
            backgroundColor: '#0066FF',
            color: '#FFF',
            padding: '14px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontWeight: '800', fontSize: '14px' }}>💬 Chat Bantuan Lokalify</span>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: '14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#F8FAFC' }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.sender === 'user' ? '#0066FF' : '#E2E8F0',
                  color: msg.sender === 'user' ? '#FFF' : '#1E293B',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  maxWidth: '80%',
                  fontSize: '13px',
                  lineHeight: '1.4'
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Form Input Message */}
          <form onSubmit={handleSendMessage} style={{ padding: '10px', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '6px', backgroundColor: '#FFF' }}>
            <input
              type="text"
              placeholder="Ketik pesan..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }}
            />
            <button type="submit" style={{ padding: '8px 12px', backgroundColor: '#0066FF', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              Kirim
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#0066FF',
          color: '#FFF',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(0,102,255,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        💬
      </button>
    </div>
  );
}