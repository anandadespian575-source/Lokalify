import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

// Import Seluruh Komponen
import Navbar from './components/Navbar';
import DestinationCard from './components/DestinationCard';
import DestinationDetailTab from './components/DestinationDetailTab';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';
import BugBotModal from './components/BugBotModal';
import ChatWidget from './components/ChatWidget';
import MapSection from './components/MapSection';
import Notifications from './components/Notifications';

export default function MainApp() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('beranda'); // 'beranda' | 'detail' | 'admin'
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Modal States
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBugBotOpen, setIsBugBotOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Review Form States
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  // Fetch Data dari Database Supabase
  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.error('Gagal mengambil data wisata:', error.message);
      } else if (data) {
        setDestinations(data);
      }
    } catch (err) {
      console.error('Error koneksi Supabase:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // Handler Pilih Wisata untuk Masuk ke Tab Detail
  const handleSelectDestination = (dest) => {
    setSelectedDestination(dest);
    setActiveTab('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler Tambah Ulasan
  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newReview = {
      user: currentUser?.displayName || currentUser?.name || 'Pengunjung',
      rating: Number(newRating),
      comment: newComment,
      date: new Date().toLocaleDateString('id-ID')
    };

    const updatedReviews = [newReview, ...(selectedDestination.reviews || [])];

    // Optimistic Update UI
    setSelectedDestination({ ...selectedDestination, reviews: updatedReviews });

    try {
      const { error } = await supabase
        .from('destinations')
        .update({ reviews: updatedReviews })
        .eq('id', selectedDestination.id);

      if (error) throw error;
      alert('🌟 Ulasan berhasil dikirim!');
    } catch (err) {
      alert('Gagal mengirim ulasan: ' + err.message);
    } finally {
      setNewComment('');
    }
  };

  // Filter Destinasi Berdasarkan Kategori & Pencarian
  const filteredDestinations = destinations.filter((item) => {
    const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#F8FAFC', minHeight: '100vh', color: '#1E293B' }}>
      {/* Navbar Navigation */}
      <Navbar 
        currentUser={currentUser} 
        setCurrentUser={setCurrentUser} 
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenBugBot={() => setIsBugBotOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Content Beranda */}
      {activeTab === 'beranda' && (
        <main style={{ padding: '32px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          {/* Peta Interaktif */}
          <MapSection destinations={filteredDestinations} onSelectDestination={handleSelectDestination} />

          {/* Filter Kategori */}
          <div style={{ display: 'flex', gap: '10px', margin: '24px 0', overflowX: 'auto', paddingBottom: '8px' }}>
            {['Semua', 'Wisata Alam', 'Kuliner', 'Budaya', 'Rekreasi'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '20px',
                  border: 'none',
                  backgroundColor: selectedCategory === cat ? '#0066FF' : '#E2E8F0',
                  color: selectedCategory === cat ? '#FFF' : '#475569',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: '800', margin: '16px 0', color: '#1E293B' }}>
            📍 Destinasi Wisata Populer
          </h2>

          {loading ? (
            <p style={{ color: '#64748B' }}>Memuat data dari database Supabase...</p>
          ) : filteredDestinations.length === 0 ? (
            <p style={{ color: '#64748B' }}>Tidak ada tempat wisata yang ditemukan.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
              {filteredDestinations.map((item) => (
                <DestinationCard 
                  key={item.id} 
                  item={item} 
                  setSelectedDestination={handleSelectDestination} 
                  currentUser={currentUser} 
                />
              ))}
            </div>
          )}
        </main>
      )}

      {/* Content Detail Wisata */}
      {activeTab === 'detail' && (
        <DestinationDetailTab 
          selectedDestination={selectedDestination}
          onBack={() => setActiveTab('beranda')}
          currentUser={currentUser}
          newRating={newRating}
          setNewRating={setNewRating}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddReview={handleAddReview}
        />
      )}

      {/* Content Admin Panel */}
      {activeTab === 'admin' && currentUser?.role === 'admin' && (
        <AdminPanel destinations={destinations} refreshData={fetchDestinations} />
      )}

      {/* Floating Widgets & Modals */}
      <ChatWidget />
      <Notifications />

      {isAuthOpen && (
        <AuthModal 
          onClose={() => setIsAuthOpen(false)} 
          setCurrentUser={setCurrentUser} 
        />
      )}

      {isBugBotOpen && (
        <BugBotModal 
          onClose={() => setIsBugBotOpen(false)} 
        />
      )}
    </div>
  );
}