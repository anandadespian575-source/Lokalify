import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import Komponen Modular
import Navbar from './components/Navbar';
import DestinationCard from './components/DestinationCard';
import DetailWidget from './components/DetailWidget';
import AuthModal from './components/AuthModal';

// Mock Data Awal Wisata
const DEFAULT_DESTINATIONS = [
  {
    id: 1,
    title: 'Ecopark Curug Tilu',
    category: 'Alam',
    location: 'Ecopark Curugtilu Jalan Raya Ciwidey - Rancabali',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description: 'Wisata alam asri dengan pemandangan air terjun dan fasilitas lengkap.',
    facilities: ['Parkir', 'Toilet', 'Penginapan', 'Resto'],
    hours: '08:00 - 17:00',
    lat: -7.1662,
    lng: 107.3575,
    isFavorite: false,
    reviews: []
  },
  {
    id: 2,
    title: 'Situ Patenggang',
    category: 'Danau',
    location: 'Situ Patenggang, Rancabali, Bandung',
    price: 20000,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    description: 'Danau alami di tengah hamparan kebun teh yang sejuk dan asri.',
    facilities: ['Perahu', 'Parkir', 'Toilet', 'Warung Makan'],
    hours: '08:00 - 17:00',
    lat: -7.1664,
    lng: 107.3562,
    isFavorite: false,
    reviews: []
  }
];

const MAIN_ADMIN = {
  displayName: 'Despian Ananda',
  username: 'despian',
  email: 'despian@lokalify.com',
  password: 'admin123',
  role: 'admin',
  avatar: '',
  bio: 'Pengembang utama Lokalify Wisata.',
  socialLinks: {
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
    website: 'https://lokalify.com'
  }
};

export default function MainApp() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tab State
  const [activeTab, setActiveTab] = useState('beranda'); // 'beranda' | 'lokasi'

  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('Izin lokasi belum diberikan');

  // Drawer / Sidebar Control
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Auth & Database User
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('user');
  const [adminCode, setAdminCode] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('lokalify_current_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('lokalify_users_db');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.some((u) => u.username === 'despian') ? parsed : [MAIN_ADMIN, ...parsed];
    }
    return [MAIN_ADMIN];
  });

  // Profil Form Customization State
  const [editDisplayName, setEditDisplayName] = useState('');
  const [editAvatar, setEditAvatar] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editInstagram, setEditInstagram] = useState('');
  const [editTiktok, setEditTiktok] = useState('');
  const [editWebsite, setEditWebsite] = useState('');

  // Synchronize Profil Form saat Modal Profil Dibuka atau currentUser berubah
  useEffect(() => {
    if (currentUser) {
      setEditDisplayName(currentUser.displayName || '');
      setEditAvatar(currentUser.avatar || '');
      setEditBio(currentUser.bio || '');
      setEditInstagram(currentUser.socialLinks?.instagram || '');
      setEditTiktok(currentUser.socialLinks?.tiktok || '');
      setEditWebsite(currentUser.socialLinks?.website || '');
    }
  }, [currentUser, showProfileModal]);

  // Admin Form State
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Alam');
  const [newPrice, setNewPrice] = useState('');
  const [newImageBase64, setNewImageBase64] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newFacilities, setNewFacilities] = useState('');
  const [newHours, setNewHours] = useState('08:00 - 17:00');
  
  // State Search Lokasi Google Maps
  const [searchLocationQuery, setSearchLocationQuery] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [selectedLocationData, setSelectedLocationData] = useState({
    name: '',
    lat: -7.1662,
    lng: 107.3575
  });

  // Chat State
  const [showChatModal, setShowChatModal] = useState(false);
  const [friendsList, setFriendsList] = useState([]);
  const [activeChatFriend, setActiveChatFriend] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [inputMessage, setInputMessage] = useState('');

  // Bug Bot State
  const [showBugBotModal, setShowBugBotModal] = useState(false);
  const [bugBotStep, setBugBotStep] = useState(1);
  const [bugCategory, setBugCategory] = useState('');
  const [bugDescription, setBugDescription] = useState('');
  const [bugBotMessages, setBugBotMessages] = useState([
    { sender: 'bot', text: 'Halo! Saya BugBot 🤖. Ada kendala atau masalah apa yang kamu temukan di aplikasi Lokalify?' }
  ]);
  const [bugReportsHistory, setBugReportsHistory] = useState(() => {
    const saved = localStorage.getItem('lokalify_bug_reports');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const savedDest = localStorage.getItem('lokalify_destinations');
    if (savedDest) {
      const parsed = JSON.parse(savedDest);
      setDestinations(parsed);
      if (parsed.length > 0) setSelectedDestination(parsed[0]);
    } else {
      setDestinations(DEFAULT_DESTINATIONS);
      setSelectedDestination(DEFAULT_DESTINATIONS[0]);
      localStorage.setItem('lokalify_destinations', JSON.stringify(DEFAULT_DESTINATIONS));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('lokalify_users_db', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem('lokalify_bug_reports', JSON.stringify(bugReportsHistory));
  }, [bugReportsHistory]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('lokalify_current_user', JSON.stringify(currentUser));
      const savedChats = localStorage.getItem(`lokalify_chats_${currentUser.username}`);
      if (savedChats) setChatMessages(JSON.parse(savedChats));

      const savedFriends = localStorage.getItem(`lokalify_friends_${currentUser.username}`);
      let currentFriends = savedFriends ? JSON.parse(savedFriends) : [];

      if (currentUser.username !== 'despian') {
        const hasDespian = currentFriends.some((f) => f.username === 'despian');
        if (!hasDespian) {
          currentFriends = [
            { displayName: MAIN_ADMIN.displayName, username: MAIN_ADMIN.username, role: MAIN_ADMIN.role, isPermanent: true },
            ...currentFriends
          ];
        }
      }

      setFriendsList(currentFriends);
      if (currentFriends.length > 0 && !activeChatFriend) {
        setActiveChatFriend(currentFriends[0]);
      }
      localStorage.setItem(`lokalify_friends_${currentUser.username}`, JSON.stringify(currentFriends));
    } else {
      localStorage.removeItem('lokalify_current_user');
    }
  }, [currentUser]);

  // Handler simpan perbaikan profil
  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      displayName: editDisplayName || currentUser.displayName,
      avatar: editAvatar,
      bio: editBio,
      socialLinks: {
        instagram: editInstagram,
        tiktok: editTiktok,
        website: editWebsite
      }
    };

    // Update currentUser state & localStorage
    setCurrentUser(updatedUser);

    // Update data pengguna di database `registeredUsers`
    const updatedUsersList = registeredUsers.map((u) => 
      u.username === currentUser.username ? updatedUser : u
    );
    setRegisteredUsers(updatedUsersList);

    alert('✅ Profil berhasil diperbarui dan disimpan ke database!');
    setShowProfileModal(false);
  };

  // Handler Upload Foto Profil Custom
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran foto terlalu besar! Maksimal 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler Kirim Pesan Chat
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeChatFriend) return;

    const friendUsername = activeChatFriend.username;
    const newMsg = {
      id: Date.now(),
      sender: currentUser.username,
      text: inputMessage,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    const updatedChat = {
      ...chatMessages,
      [friendUsername]: [...(chatMessages[friendUsername] || []), newMsg]
    };

    setChatMessages(updatedChat);
    localStorage.setItem(`lokalify_chats_${currentUser.username}`, JSON.stringify(updatedChat));
    setInputMessage('');
  };

  // Handler Upload File Gambar ke Base64 (Untuk Admin Wisata)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran foto terlalu besar! Maksimal 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler Search Lokasi Google Maps
  const handleSearchLocationInput = async (query) => {
    setSearchLocationQuery(query);
    if (query.trim().length > 2) {
      try {
        const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`);
        setLocationSuggestions(res.data || []);
      } catch (err) {
        console.error("Gagal mengambil lokasi", err);
      }
    } else {
      setLocationSuggestions([]);
    }
  };

  const handleSelectLocationItem = (item) => {
    setSearchLocationQuery(item.display_name);
    setSelectedLocationData({
      name: item.display_name,
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon)
    });
    setLocationSuggestions([]);
  };

  const openNewAdminForm = () => {
    setEditingId(null);
    setNewTitle('');
    setNewCategory('Alam');
    setNewPrice('');
    setNewImageBase64('');
    setNewDesc('');
    setNewFacilities('');
    setNewHours('08:00 - 17:00');
    setSearchLocationQuery('');
    setSelectedLocationData({ name: '', lat: -7.1662, lng: 107.3575 });
    setShowAdminPanel(true);
  };

  const handleEditDestination = (item) => {
    setEditingId(item.id);
    setNewTitle(item.title);
    setNewCategory(item.category);
    setNewPrice(item.price);
    setNewImageBase64(item.image);
    setNewDesc(item.description);
    setNewFacilities(Array.isArray(item.facilities) ? item.facilities.join(', ') : item.facilities);
    setNewHours(item.hours || '08:00 - 17:00');
    setSearchLocationQuery(item.location);
    setSelectedLocationData({
      name: item.location,
      lat: item.lat || -7.1662,
      lng: item.lng || 107.3575
    });
    setShowAdminPanel(true);
  };

  const handleDeleteDestination = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus destinasi wisata ini?')) {
      const updated = destinations.filter((d) => d.id !== id);
      setDestinations(updated);
      localStorage.setItem('lokalify_destinations', JSON.stringify(updated));
      if (selectedDestination?.id === id) {
        setSelectedDestination(updated.length > 0 ? updated[0] : null);
      }
      alert('🗑️ Wisata berhasil dihapus!');
    }
  };

  const handleSaveDestination = (e) => {
    e.preventDefault();
    if (!newTitle || !searchLocationQuery || !newPrice) {
      alert('Harap isi nama wisata, lokasi, dan harga tiket!');
      return;
    }

    const payload = {
      title: newTitle,
      category: newCategory,
      location: selectedLocationData.name || searchLocationQuery,
      price: Number(newPrice),
      image: newImageBase64 || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      description: newDesc || 'Destinasi wisata pilihan.',
      facilities: newFacilities ? newFacilities.split(',').map(f => f.trim()) : ['Parkir', 'Toilet'],
      hours: newHours,
      lat: selectedLocationData.lat,
      lng: selectedLocationData.lng,
    };

    if (editingId) {
      const updated = destinations.map((d) => (d.id === editingId ? { ...d, ...payload } : d));
      setDestinations(updated);
      localStorage.setItem('lokalify_destinations', JSON.stringify(updated));
      if (selectedDestination?.id === editingId) {
        setSelectedDestination({ ...selectedDestination, ...payload });
      }
      alert('✅ Wisata berhasil diperbarui!');
    } else {
      const newItem = { id: Date.now(), ...payload, isFavorite: false, reviews: [] };
      const updated = [newItem, ...destinations];
      setDestinations(updated);
      localStorage.setItem('lokalify_destinations', JSON.stringify(updated));
    }

    setShowAdminPanel(false);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    const formattedUsername = username.trim().toLowerCase();

    if (registeredUsers.some((u) => u.username === formattedUsername)) {
      setAuthError('❌ Username sudah digunakan!');
      return;
    }
    if (registeredUsers.some((u) => u.email === email)) {
      setAuthError('❌ Email sudah terdaftar!');
      return;
    }
    if (role === 'admin' && adminCode.trim() !== 'LOKALIFY2026') {
      setAuthError('❌ Kode rahasia Admin salah!');
      return;
    }

    const newUser = {
      displayName: displayName || formattedUsername,
      username: formattedUsername,
      email,
      password,
      role,
      avatar: '',
      bio: '',
      socialLinks: { instagram: '', tiktok: '', website: '' }
    };

    setRegisteredUsers([...registeredUsers, newUser]);
    setCurrentUser(newUser);
    setShowAuthModal(false);
    alert(`🎉 Selamat datang @${formattedUsername}`);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    const inputKey = email.trim().toLowerCase();
    const foundUser = registeredUsers.find(
      (u) => (u.email === inputKey || u.username === inputKey) && u.password === password
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      setShowAuthModal(false);
    } else {
      setAuthError('❌ Email/Username atau Password salah!');
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setLocationStatus('Mengambil lokasi GPS...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLocation({ lat, lng });
          setLocationStatus(`📍 GPS Aktif: (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
          alert(`📍 Lokasi GPS Ditemukan!\nLatitude: ${lat}\nLongitude: ${lng}`);
        },
        () => setLocationStatus('Gagal mengambil GPS.')
      );
    }
  };

  // Handler Laporan Bug Bot
  const handleSelectBugCategory = (category) => {
    setBugCategory(category);
    setBugBotMessages((prev) => [
      ...prev,
      { sender: 'user', text: `Kategori: ${category}` },
      { sender: 'bot', text: `Terima kasih! Silakan deskripsikan detail masalah "${category}" yang kamu alami:` }
    ]);
    setBugBotStep(2);
  };

  const handleSendBugDetail = (e) => {
    e.preventDefault();
    if (!bugDescription.trim()) return;

    const newReport = {
      id: Date.now(),
      reporter: currentUser ? currentUser.username : 'Guest',
      category: bugCategory,
      description: bugDescription,
      date: new Date().toLocaleDateString('id-ID'),
      status: 'Sedang Diproses ⏳'
    };

    setBugReportsHistory([newReport, ...bugReportsHistory]);

    setBugBotMessages((prev) => [
      ...prev,
      { sender: 'user', text: bugDescription },
      { sender: 'bot', text: '✅ Terima kasih! Laporan bug telah dikirimkan ke tim admin untuk segera diperbaiki.' }
    ]);

    setBugDescription('');
    setBugBotStep(3);
  };

  const categories = [
    { name: 'Alam', icon: '🌲' },
    { name: 'Danau', icon: '🌊' },
    { name: 'Kebun Teh', icon: '🍃' },
    { name: 'Kuliner', icon: '🍲' },
    { name: 'Outbound', icon: '🏕️' }
  ];

  const filteredDestinations = destinations.filter((item) => {
    const matchCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#F8FAFC', minHeight: '100vh', position: 'relative' }}>
      
      {/* NAVBAR */}
      <Navbar
        currentUser={currentUser}
        setShowAdminPanel={openNewAdminForm}
        setShowAuthModal={setShowAuthModal}
        setShowProfileModal={() => setShowProfileModal(true)}
        handleLogout={() => setCurrentUser(null)}
        setIsSidebarOpen={() => setIsSidebarOpen(!isSidebarOpen)}
        openChatModal={() => {
          if (!currentUser) setShowAuthModal(true);
          else setShowChatModal(true);
        }}
      />

      {/* OVERLAY SIDEBAR */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1400 }}
        />
      )}

      {/* SIDEBAR DRAWER MENU */}
      <aside style={{
        position: 'fixed',
        top: 0,
        left: isSidebarOpen ? 0 : '-300px',
        width: '270px',
        height: '100vh',
        backgroundColor: '#FFF',
        boxShadow: '4px 0 16px rgba(0,0,0,0.15)',
        zIndex: 1500,
        transition: 'left 0.3s ease',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0066FF' }}>Lokalify Menu</h3>
          <button onClick={() => setIsSidebarOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✖</button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
          <button
            onClick={() => { setActiveTab('beranda'); setIsSidebarOpen(false); }}
            style={{ textAlign: 'left', background: activeTab === 'beranda' ? '#EFF6FF' : '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: activeTab === 'beranda' ? '#0066FF' : '#334155', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            🏠 <span>Beranda Wisata</span>
          </button>

          <button
            onClick={() => { setActiveTab('lokasi'); setIsSidebarOpen(false); }}
            style={{ textAlign: 'left', background: activeTab === 'lokasi' ? '#EFF6FF' : '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: activeTab === 'lokasi' ? '#0066FF' : '#334155', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            📍 <span>Cek Lokasi GPS Terdekat</span>
          </button>

          <button
            onClick={() => {
              setIsSidebarOpen(false);
              if (!currentUser) setShowAuthModal(true);
              else setShowChatModal(true);
            }}
            style={{ textAlign: 'left', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#334155', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            💬 <span>Fitur Chat & Teman</span>
          </button>

          <button
            onClick={() => {
              setIsSidebarOpen(false);
              if (!currentUser) setShowAuthModal(true);
              else setShowProfileModal(true);
            }}
            style={{ textAlign: 'left', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#334155', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            👤 <span>Menu Profil Akun</span>
          </button>

          <button
            onClick={() => {
              setIsSidebarOpen(false);
              setShowBugBotModal(true);
            }}
            style={{ textAlign: 'left', background: '#FEF3C7', border: '1px solid #FDE68A', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '700', color: '#D97706', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            🤖 <span>Lapor Bug (BugBot)</span>
          </button>

          {currentUser?.role === 'admin' && (
            <button
              onClick={() => { openNewAdminForm(); setIsSidebarOpen(false); }}
              style={{ textAlign: 'left', backgroundColor: '#EFF6FF', color: '#0066FF', border: '1px solid #BFDBFE', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '700', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              ⚙️ <span>Kelola Wisata (Admin)</span>
            </button>
          )}
        </nav>
      </aside>

      {/* VIEW TAB 1: BERANDA WISATA */}
      {activeTab === 'beranda' && (
        <main style={{ display: 'flex', gap: '24px', padding: '24px 32px', maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ flex: '2' }}>
            <section style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>Kategori Wisata</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '10px' }}>
                <div
                  onClick={() => setSelectedCategory('Semua')}
                  style={{ padding: '10px', borderRadius: '12px', cursor: 'pointer', textAlign: 'center', backgroundColor: selectedCategory === 'Semua' ? '#0066FF' : '#FFF', color: selectedCategory === 'Semua' ? '#FFF' : '#333', border: '1px solid #E2E8F0' }}
                >
                  🏞️ <br /> <span style={{ fontSize: '12px' }}>Semua</span>
                </div>
                {categories.map((cat) => (
                  <div
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    style={{ padding: '10px', borderRadius: '12px', cursor: 'pointer', textAlign: 'center', backgroundColor: selectedCategory === cat.name ? '#0066FF' : '#FFF', color: selectedCategory === cat.name ? '#FFF' : '#333', border: '1px solid #E2E8F0' }}
                  >
                    {cat.icon} <br /> <span style={{ fontSize: '12px' }}>{cat.name}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>Daftar Wisata</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '16px' }}>
                {filteredDestinations.map((item) => (
                  <DestinationCard
                    key={item.id}
                    item={item}
                    setSelectedDestination={setSelectedDestination}
                    currentUser={currentUser}
                    onEdit={handleEditDestination}
                    onDelete={handleDeleteDestination}
                  />
                ))}
              </div>
            </section>
          </div>

          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <DetailWidget
              selectedDestination={selectedDestination}
              currentUser={currentUser}
              onAddReview={(id, rev) => {
                const updated = destinations.map((d) => d.id === id ? { ...d, reviews: [rev, ...(d.reviews || [])] } : d);
                setDestinations(updated);
                localStorage.setItem('lokalify_destinations', JSON.stringify(updated));
                if (selectedDestination?.id === id) {
                  setSelectedDestination({ ...selectedDestination, reviews: [rev, ...(selectedDestination.reviews || [])] });
                }
              }}
            />
          </div>
        </main>
      )}

      {/* VIEW TAB 2: CEK LOKASI GPS TERDEKAT & PETA INTERAKTIF */}
      {activeTab === 'lokasi' && (
        <main style={{ padding: '24px 32px', maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#1E293B' }}>📍 Peta Interaktif & Cek GPS Terdekat</h2>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>{locationStatus}</p>
              </div>
              <button
                onClick={handleGetLocation}
                style={{ padding: '10px 18px', backgroundColor: '#0066FF', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                📡 Ambil Lokasi Saya
              </button>
            </div>

            <iframe
              title="Google Map View Full"
              width="100%"
              height="450"
              style={{ borderRadius: '12px', border: '1px solid #CBD5E1' }}
              loading="lazy"
              src={`https://maps.google.com/maps?q=${userLocation ? `${userLocation.lat},${userLocation.lng}` : selectedDestination ? `${selectedDestination.lat},${selectedDestination.lng}` : '-7.1662,107.3575'}&z=14&output=embed`}
            />

            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>Pilih Lokasi Wisata di Peta:</h3>
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
                {destinations.map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => setSelectedDestination(dest)}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '10px',
                      border: selectedDestination?.id === dest.id ? '2px solid #0066FF' : '1px solid #CBD5E1',
                      backgroundColor: selectedDestination?.id === dest.id ? '#EFF6FF' : '#FFF',
                      fontWeight: '600',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    📍 {dest.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* MODAL FITUR CHAT & TEMAN */}
      {showChatModal && currentUser && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#FFF', borderRadius: '16px', width: '90%', maxWidth: '750px', height: '520px', display: 'flex', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
            
            {/* DAFTAR TEMAN */}
            <div style={{ width: '260px', backgroundColor: '#F8FAFC', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '16px', borderBottom: '1px solid #E2E8F0', fontWeight: '800', color: '#1E293B', fontSize: '15px' }}>
                💬 Teman Chat
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {friendsList.map((friend) => (
                  <div
                    key={friend.username}
                    onClick={() => setActiveChatFriend(friend)}
                    style={{
                      padding: '12px 16px',
                      cursor: 'pointer',
                      backgroundColor: activeChatFriend?.username === friend.username ? '#EFF6FF' : 'transparent',
                      borderLeft: activeChatFriend?.username === friend.username ? '4px solid #0066FF' : '4px solid transparent',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#0066FF', color: '#FFF', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
                      {friend.displayName ? friend.displayName.charAt(0) : 'U'}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1E293B' }}>{friend.displayName}</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>@{friend.username}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AREA ISI CHAT */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#FFF' }}>
              <div style={{ padding: '14px 16px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
                  {activeChatFriend ? `💬 Chat dengan ${activeChatFriend.displayName}` : 'Pilih teman untuk chat'}
                </span>
                <button onClick={() => setShowChatModal(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✖</button>
              </div>

              <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#F1F5F9' }}>
                {activeChatFriend && chatMessages[activeChatFriend.username]?.map((msg) => (
                  <div key={msg.id} style={{ alignSelf: msg.sender === currentUser.username ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                    <div style={{
                      padding: '8px 12px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      backgroundColor: msg.sender === currentUser.username ? '#0066FF' : '#FFF',
                      color: msg.sender === currentUser.username ? '#FFF' : '#333',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                    }}>
                      {msg.text}
                    </div>
                    <span style={{ fontSize: '10px', color: '#94A3B8', display: 'block', textAlign: msg.sender === currentUser.username ? 'right' : 'left', marginTop: '2px' }}>{msg.time}</span>
                  </div>
                ))}
              </div>

              {activeChatFriend && (
                <form onSubmit={handleSendMessage} style={{ padding: '12px', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Ketik pesan..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  />
                  <button type="submit" style={{ padding: '10px 16px', backgroundColor: '#0066FF', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Kirim
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL PROFIL AKUN (KUSTOMISASI & PERMANEN USERNAME) */}
      {showProfileModal && currentUser && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '16px', width: '90%', maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>👤 Pengaturan Profil Akun</h3>
              <button onClick={() => setShowProfileModal(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✖</button>
            </div>

            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* AVATAR / FOTO PROFIL */}
              <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                {editAvatar ? (
                  <img src={editAvatar} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #0066FF', margin: '0 auto 8px auto', display: 'block' }} />
                ) : (
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#0066FF', color: '#FFF', fontSize: '32px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 8px auto' }}>
                    {editDisplayName ? editDisplayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
                
                <label style={{ cursor: 'pointer', fontSize: '12px', color: '#0066FF', fontWeight: 'bold', display: 'inline-block' }}>
                  📷 Ganti Foto Profil
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: 'none' }} />
                </label>
              </div>

              {/* USERNAME (LOCKED / PERMANEN) */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748B', display: 'block', marginBottom: '4px' }}>
                  Username (Permanen - Tidak Dapat Diubah):
                </label>
                <input
                  type="text"
                  value={`@${currentUser.username}`}
                  disabled
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#F1F5F9', color: '#64748B', cursor: 'not-allowed', fontSize: '13px', fontWeight: 'bold' }}
                />
              </div>

              {/* DISPLAY NAME */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Nama Tampilan (Display Name):
                </label>
                <input
                  type="text"
                  value={editDisplayName}
                  onChange={(e) => setEditDisplayName(e.target.value)}
                  placeholder="Masukkan nama tampilan..."
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              {/* BIO / DESKRIPSI DIRI */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Bio / Deskripsi Diri:
                </label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Tuliskan bio singkat kamu..."
                  rows={2}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              {/* LINK SOSIAL MEDIA */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  🔗 Link Sosial Media:
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input
                    type="url"
                    placeholder="Instagram URL (https://instagram.com/...)"
                    value={editInstagram}
                    onChange={(e) => setEditInstagram(e.target.value)}
                    style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                  />
                  <input
                    type="url"
                    placeholder="TikTok URL (https://tiktok.com/@...)"
                    value={editTiktok}
                    onChange={(e) => setEditTiktok(e.target.value)}
                    style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                  />
                  <input
                    type="url"
                    placeholder="Website / Portofolio (https://...)"
                    value={editWebsite}
                    onChange={(e) => setEditWebsite(e.target.value)}
                    style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                  />
                </div>
              </div>

              {/* TOMBOL SIMPAN & LOGOUT */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="submit"
                  style={{ flex: 1, padding: '10px', backgroundColor: '#0066FF', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
                >
                  Simpan Perubahan
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentUser(null);
                    setShowProfileModal(false);
                  }}
                  style={{ flex: 1, padding: '10px', backgroundColor: '#EF4444', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
                >
                  Keluar (Logout)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL LAPOR BUG (BUGBOT) */}
      {showBugBotModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#FFF', borderRadius: '16px', width: '90%', maxWidth: '480px', height: '520px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
            
            <div style={{ backgroundColor: '#F59E0B', color: '#FFF', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>🤖</span>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>BugBot Assistant</h3>
              </div>
              <button onClick={() => setShowBugBotModal(false)} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '18px', cursor: 'pointer' }}>✖</button>
            </div>

            <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#F8FAFC' }}>
              {bugBotMessages.map((msg, index) => (
                <div key={index} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  <div style={{
                    padding: '10px 14px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    backgroundColor: msg.sender === 'user' ? '#0066FF' : '#FFF',
                    color: msg.sender === 'user' ? '#FFF' : '#1E293B',
                    border: msg.sender === 'user' ? 'none' : '1px solid #E2E8F0',
                    lineHeight: '1.4'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {bugBotStep === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748B' }}>Pilih jenis masalah:</span>
                  {['Tampilan / UI Rusak', 'Fitur Peta / Lokasi Error', 'Gagal Upload Gambar', 'Lainnya'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleSelectBugCategory(cat)}
                      style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', textAlign: 'left', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
                    >
                      📌 {cat}
                    </button>
                  ))}
                </div>
              )}

              {bugReportsHistory.length > 0 && (
                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #E2E8F0' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748B' }}>📋 Riwayat Laporan Bug Kamu:</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                    {bugReportsHistory.map((rep) => (
                      <div key={rep.id} style={{ padding: '8px', backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '11px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                          <span>{rep.category}</span>
                          <span style={{ color: '#D97706' }}>{rep.status}</span>
                        </div>
                        <div style={{ color: '#475569', marginTop: '2px' }}>{rep.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {bugBotStep === 2 && (
              <form onSubmit={handleSendBugDetail} style={{ padding: '12px', backgroundColor: '#FFF', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Ketik detail masalah di sini..."
                  value={bugDescription}
                  onChange={(e) => setBugDescription(e.target.value)}
                  style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                />
                <button type="submit" style={{ padding: '10px 16px', backgroundColor: '#F59E0B', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Kirim
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* FORM MODAL KELOLA WISATA (ADMIN) */}
      {showAdminPanel && currentUser?.role === 'admin' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '12px', width: '90%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginTop: 0 }}>{editingId ? '✏️ Edit Wisata' : '➕ Tambah Wisata Baru'}</h3>
            
            <form onSubmit={handleSaveDestination} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
              <input
                type="text"
                placeholder="Nama Tempat Wisata..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '14px' }}
              />

              <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '14px' }}>
                <option value="Alam">Alam</option>
                <option value="Danau">Danau</option>
                <option value="Kebun Teh">Kebun Teh</option>
                <option value="Kuliner">Kuliner</option>
                <option value="Outbound">Outbound</option>
              </select>

              <div style={{ position: 'relative' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#334155', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                  🔍 Cari & Set Lokasi Alamat:
                </label>
                <input
                  type="text"
                  placeholder="Ketik lokasi..."
                  value={searchLocationQuery}
                  onChange={(e) => handleSearchLocationInput(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1', boxSizing: 'border-box', fontSize: '13px' }}
                />

                {locationSuggestions.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: '#FFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                    zIndex: 50,
                    maxHeight: '220px',
                    overflowY: 'auto',
                    marginTop: '4px'
                  }}>
                    {locationSuggestions.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectLocationItem(item)}
                        style={{
                          padding: '10px 12px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          cursor: 'pointer',
                          borderBottom: '1px solid #F1F5F9'
                        }}
                      >
                        <span style={{ fontSize: '16px', color: '#64748B' }}>📍</span>
                        <div style={{ fontSize: '12px', color: '#1E293B', lineHeight: '1.4' }}>
                          {item.display_name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <input
                type="number"
                placeholder="Harga Tiket Masuk (Rp)"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                required
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '14px' }}
              />

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px', color: '#334155' }}>
                  🖼️ Upload Foto Wisata (Pilih File):
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                />
              </div>

              <textarea
                placeholder="Deskripsi Tempat Wisata..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                rows={3}
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: '#0066FF', color: '#FFF', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                  {editingId ? 'Simpan Perubahan' : 'Tambah Wisata'}
                </button>
                <button type="button" onClick={() => setShowAdminPanel(false)} style={{ flex: 1, padding: '10px', backgroundColor: '#64748B', color: '#FFF', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      <AuthModal
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
        handleAuthSubmit={handleAuthSubmit}
        authError={authError}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        isRegister={isRegister}
        setIsRegister={setIsRegister}
        role={role}
        setRole={setRole}
        adminCode={adminCode}
        setAdminCode={setAdminCode}
        handleRegisterSubmit={handleRegisterSubmit}
        displayName={displayName}
        setDisplayName={setDisplayName}
        username={username}
        setUsername={setUsername}
      />
    </div>
  );
}