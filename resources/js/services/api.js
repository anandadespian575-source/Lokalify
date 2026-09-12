import { destinationsData, categoriesData, initialReviewsData } from '../data/destinations';

// UNTUK NANTINYA MENGGUNAKAN LARAVEL REST API:
// const BASE_URL = 'http://localhost:8000/api';

export const apiService = {
  // 1. GET ALL DESTINATIONS (Dengan fitur Pencarian & Filter)
  async getDestinations(filters = {}) {
    // Simulasi delay jaringan (100ms)
    await new Promise((res) => setTimeout(res, 100));

    let results = [...destinationsData];

    // Filter berdasarkan Keyword / Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter((d) =>
        d.name.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q) ||
        d.category_name.toLowerCase().includes(q)
      );
    }

    // Filter berdasarkan Kategori
    if (filters.category && filters.category !== 'Semua') {
      results = results.filter((d) =>
        d.category_id.toLowerCase() === filters.category.toLowerCase() ||
        d.category_name.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Filter berdasarkan Rating Minimum
    if (filters.minRating) {
      results = results.filter((d) => d.rating >= parseFloat(filters.minRating));
    }

    // Filter berdasarkan Harga Maksimum
    if (filters.maxPrice) {
      results = results.filter((d) => d.ticket_price <= parseInt(filters.maxPrice, 10));
    }

    return results;
  },

  // 2. GET DESTINATION BY ID
  async getDestinationById(id) {
    await new Promise((res) => setTimeout(res, 100));
    return destinationsData.find((d) => d.id === parseInt(id, 10)) || null;
  },

  // 3. GET CATEGORIES
  async getCategories() {
    await new Promise((res) => setTimeout(res, 50));
    return categoriesData;
  },

  // 4. GET REVIEWS (Bisa filter per destinasi atau ambil semua)
  async getReviews(destinationId = null) {
    await new Promise((res) => setTimeout(res, 100));
    const reviews = JSON.parse(localStorage.getItem('lokalify_reviews')) || initialReviewsData;
    
    if (destinationId) {
      return reviews.filter((r) => r.destination_id === parseInt(destinationId, 10));
    }
    return reviews;
  },

  // 5. POST A NEW REVIEW (Disimpan ke LocalStorage)
  async addReview(reviewData) {
    await new Promise((res) => setTimeout(res, 150));
    const reviews = JSON.parse(localStorage.getItem('lokalify_reviews')) || initialReviewsData;
    
    const newReview = {
      id: Date.now(),
      destination_id: parseInt(reviewData.destination_id, 10),
      user_name: reviewData.user_name || 'Pengunjung',
      user_avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
      rating: parseFloat(reviewData.rating) || 5,
      comment: reviewData.comment || '',
      date: 'Baru saja'
    };

    const updated = [newReview, ...reviews];
    localStorage.setItem('lokalify_reviews', JSON.stringify(updated));
    return newReview;
  }
};