import React, { useState, useEffect } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DestinationDetailPage from './pages/DestinationDetailPage';
import FilterPanel from './components/FilterPanel';
import DestinationCard from './components/DestinationCard';
import MapSection from './components/MapSection';
import { apiService } from './services/api';

export default function App() {
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem('lokalify_wishlist')) || [];
  });

  useEffect(() => {
    localStorage.setItem('lokalify_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleToggleWishlist = (dest) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === dest.id);
      if (exists) return prev.filter((item) => item.id !== dest.id);
      return [...prev, dest];
    });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar wishlistCount={wishlist.length} />

      <main className="container" style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home wishlist={wishlist} onToggleWishlist={handleToggleWishlist} />} />
          <Route path="/destinasi/:id" element={<DestinationDetailPage wishlist={wishlist} onToggleWishlist={handleToggleWishlist} />} />
          <Route path="/destinasi" element={<DestinasiSearchPage wishlist={wishlist} onToggleWishlist={handleToggleWishlist} />} />
          <Route path="/kategori" element={<DestinasiSearchPage wishlist={wishlist} onToggleWishlist={handleToggleWishlist} />} />
          <Route path="/peta" element={<MapPage />} />
          <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} onToggleWishlist={handleToggleWishlist} />} />
          <Route path="/review" element={<WishlistPage wishlist={wishlist} onToggleWishlist={handleToggleWishlist} />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function DestinasiSearchPage({ wishlist, onToggleWishlist }) {
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || 'Semua',
    minRating: '',
    maxPrice: ''
  });

  useEffect(() => {
    apiService.getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    apiService.getDestinations(filters).then(setDestinations);
  }, [filters]);

  return (
    <div>
      <FilterPanel filters={filters} setFilters={setFilters} categories={categories} />
      <h2 className="section-title">Hasil Destinasi ({destinations.length})</h2>

      {destinations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748B' }}>
          Destinasi tidak ditemukan. Coba ubah kata kunci filter Anda.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {destinations.map((item) => (
            <DestinationCard
              key={item.id}
              destination={item}
              isWishlisted={wishlist.some((w) => w.id === item.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MapPage() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    apiService.getDestinations().then(setDestinations);
  }, []);

  return (
    <div>
      <h2 className="section-title">Temukan Destinasi di Sekitarmu</h2>
      <MapSection destinations={destinations} />
    </div>
  );
}

function WishlistPage({ wishlist, onToggleWishlist }) {
  return (
    <div>
      <h2 className="section-title">Destinasi Favoritmu ({wishlist.length})</h2>
      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748B' }}>
          Belum ada destinasi yang disimpan di wishlist.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {wishlist.map((item) => (
            <DestinationCard
              key={item.id}
              destination={item}
              isWishlisted={true}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}