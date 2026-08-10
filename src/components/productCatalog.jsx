import React, { useState } from 'react';
import { products } from '../data/products';
import ProductCard from './productCard';

const ProductCatalog = () => {
  // State Management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1000);

  // Categories for filter dropdown
  const categories = ['All', 'Electronics', 'Clothing', 'Grocery'];

  // Dynamic Filtering Logic using filter()
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>🛍️ ShopCatalog</h1>
        {/* Product Count Display */}
        <p style={{ color: '#64748b' }}>
          Showing <strong>{filteredProducts.length}</strong> of {products.length} products
        </p>
      </header>

      {/* Filters Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px', 
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f1f5f9',
        borderRadius: '8px'
      }}>
        {/* Search by Name */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
        />

        {/* Filter by Category */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Filter by Price Range */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', color: '#475569' }}>
            Max Price: ${maxPrice}
          </label>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Product Grid using map() */}
      {filteredProducts.length > 0 ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '20px' 
        }}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Conditional Rendering: No Results Message */
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
          <p style={{ fontSize: '1.2rem' }}>No products found matching your criteria.</p>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setMaxPrice(1000); }}
            style={{ marginTop: '10px', padding: '8px 16px', cursor: 'pointer', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px' }}
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;