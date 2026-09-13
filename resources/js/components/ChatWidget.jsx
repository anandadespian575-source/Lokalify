import React, { useState } from 'react';

export default function ChatWidget({
  currentUser,
  friendsList = [],
  setFriendsList,
  activeChatFriend,
  setActiveChatFriend,
  chatMessages = {},
  inputMessage,
  setInputMessage,
  handleSendMessage
}) {
  const [searchUsername, setSearchUsername] = useState('');
  const [searchError, setSearchError] = useState('');

  // Fungsi Tambah Teman Berdasarkan Username
  const handleAddFriend = (e) => {
    e.preventDefault();
    setSearchError('');
    const target = searchUsername.trim().toLowerCase();

    if (!target) return;

    if (currentUser && target === currentUser.username?.toLowerCase()) {
      setSearchError('❌ Tidak bisa menambahkan akun sendiri!');
      return;
    }

    const alreadyFriend = friendsList.some((f) => f.username?.toLowerCase() === target);
    if (alreadyFriend) {
      setSearchError('⚠️ Username ini sudah ada di daftar teman!');
      return;
    }

    // Ambil daftar user terdaftar dari LocalStorage (atau Database)
    const allUsers = JSON.parse(localStorage.getItem('lokalify_users_db') || '[]');
    const foundUser = allUsers.find((u) => u.username?.toLowerCase() === target);

    if (foundUser) {
      const newFriend = {
        displayName: foundUser.displayName || foundUser.username,
        username: foundUser.username,
        role: foundUser.role || 'user',
        avatar: foundUser.avatar || ''
      };

      const updatedFriends = [...friendsList, newFriend];
      
      if (setFriendsList) setFriendsList(updatedFriends);
      if (currentUser?.username) {
        localStorage.setItem(`lokalify_friends_${currentUser.username}`, JSON.stringify(updatedFriends));
      }
      
      setActiveChatFriend(newFriend);
      setSearchUsername('');
      alert(`🎉 Berhasil menambahkan @${foundUser.username} ke daftar teman!`);
    } else {
      setSearchError('❌ Pengguna dengan username tersebut tidak ditemukan!');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%', minHeight: '400px' }}>
      {/* SIDEBAR KIRI: DAFTAR TEMAN & FORM TAMBAH TEMAN */}
      <div style={{ width: '38%', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', backgroundColor: '#F8FAFC' }}>
        
        {/* FORM TAMBAH TEMAN */}
        <div style={{ padding: '12px', borderBottom: '1px solid #E2E8F0', backgroundColor: '#FFF' }}>
          <form onSubmit={handleAddFriend} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748B' }}>➕ TAMBAH TEMAN CHAT</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <input
                type="text"
                placeholder="Ketik username..."
                value={searchUsername}
                onChange={(e) => setSearchUsername(e.target.value)}
                style={{ flex: 1, padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px', outline: 'none' }}
              />
              <button
                type="submit"
                style={{ padding: '6px 12px', backgroundColor: '#0066FF', color: '#FFF', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Tambah
              </button>
            </div>
            {searchError && <span style={{ fontSize: '11px', color: '#EF4444' }}>{searchError}</span>}
          </form>
        </div>

        {/* LIST TEMAN */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748B', padding: '4px 8px', display: 'block' }}>
            👥 Teman Chat ({friendsList.length})
          </span>
          {friendsList.length === 0 ? (
            <div style={{ padding: '12px', fontSize: '12px', color: '#94A3B8', textAlign: 'center' }}>
              Belum ada teman. Tambahkan teman dengan memasukkan username di atas.
            </div>
          ) : (
            friendsList.map((friend) => {
              const isActive = activeChatFriend?.username === friend.username;
              return (
                <div
                  key={friend.username}
                  onClick={() => setActiveChatFriend(friend)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    backgroundColor: isActive ? '#EFF6FF' : 'transparent',
                    border: isActive ? '1px solid #BFDBFE' : '1px solid transparent',
                    marginBottom: '4px'
                  }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#0066FF', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>
                    {friend.displayName ? friend.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {friend.displayName}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>@{friend.username}</div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* AREA CHAT KANAN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#FFF' }}>
        {activeChatFriend ? (
          <>
            {/* HEADER CHAT */}
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', fontWeight: 'bold', fontSize: '14px', color: '#1E293B' }}>
              💬 Chat dengan {activeChatFriend.displayName} (@{activeChatFriend.username})
            </div>

            {/* MESSAGES CONTAINER */}
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {(chatMessages[activeChatFriend.username] || []).map((msg, index) => {
                const isMe = msg.sender === currentUser?.username;
                return (
                  <div key={msg.id || index} style={{ alignSelf: isMe ? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
                    <div style={{
                      padding: '8px 12px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      backgroundColor: isMe ? '#0066FF' : '#F1F5F9',
                      color: isMe ? '#FFF' : '#1E293B'
                    }}>
                      {msg.text}
                    </div>
                    <span style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px', display: 'block', textAlign: isMe ? 'right' : 'left' }}>
                      {msg.time}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* INPUT CHAT */}
            <form onSubmit={handleSendMessage} style={{ padding: '12px', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Ketik pesan..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }}
              />
              <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#0066FF', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                Kirim
              </button>
            </form>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontSize: '13px' }}>
            Pilih teman di sebelah kiri untuk mulai mengobrol.
          </div>
        )}
      </div>
    </div>
  );
}
