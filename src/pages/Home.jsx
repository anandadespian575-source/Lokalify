import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import DestinationCard from '../components/DestinationCard';
import { apiService } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Home({ wishlist, onToggleWishlist }) {
  const [categories, setCategories] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiService.getCategories().then(setCategories);
    apiService.getDestinations().then(setDestinations);
  }, []);

  return (
    <div>
      <Hero />

      {/* Kategori Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 className="section-title">Jelajahi Berdasarkan Kategori</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '16px'
        }}>
          {categories.map((cat) => (
            <CategoryCard 
              key={cat.id} 
              category={cat} 
              onClick={() => navigate(`/destinasi?category=${cat.id}`)}
            />
          ))}
        </div>
      </section>

      {/* Destinasi Populer */}
      <section style={{ marginBottom: '40px' }}>
        <h2 className="section-title">Destinasi Populer</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {destinations.map((item) => (
            <DestinationCard 
              key={item.id}
              destination={item}
              isWishlisted={wishlist.some(w => w.id === item.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </section>
    </div>
  );
}