import React from 'react';

export default function CategoryCard({ category, onClick }) {
  return (
    <div 
      onClick={onClick}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
        border: '1px solid #F1F5F9',
        transition: 'all 0.2s ease',
        minWidth: '100px'
      }}
      className="category-card"
    >
      <div style={{
        fontSize: '32px',
        marginBottom: '8px',
        backgroundColor: category.color || '#F0F7FF',
        width: '64px',
        height: '64px',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {category.icon}
      </div>
      <span style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>
        {category.name}
      </span>
    </div>
  );
}