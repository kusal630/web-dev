import React from 'react';

const ProductCard = ({ product }) => {
  const isOutOfStock = product.quantity === 0;

  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: isOutOfStock ? '#f8fafc' : '#fff',
      opacity: isOutOfStock ? 0.7 : 1,
      transition: 'all 0.2s ease'
    }}>
      <img 
        src={product.image} 
        alt={product.name} 
        style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
      />
      
      <h3 style={{ margin: '12px 0 4px', fontSize: '1.1rem' }}>{product.name}</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{product.category}</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>${product.price.toFixed(2)}</span>
        
        {/* Conditional Rendering: Out of Stock Badge */}
        {isOutOfStock ? (
          <span style={{ 
            backgroundColor: '#ef4444', 
            color: 'white', 
            padding: '4px 8px', 
            borderRadius: '4px', 
            fontSize: '0.75rem',
            fontWeight: 'bold'
          }}>
            OUT OF STOCK
          </span>
        ) : (
          <span style={{ color: '#16a34a', fontSize: '0.85rem' }}>
            {product.quantity} in stock
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;