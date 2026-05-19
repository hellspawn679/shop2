import React from 'react';
import { ShoppingCart } from 'lucide-react';
import './ProductGrid.css';

const ProductGrid = ({ products, onAddToCart }) => {
  return (
    <section id="shop" className="products-section">
      <div className="container">
        <div className="section-header">
          <h2>NEW DROPS</h2>
          <div className="mono">[$ ls ./catalog]</div>
        </div>
        
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card glass-panel">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-status mono">
                  [{product.status}]
                </div>
              </div>
              
              <div className="product-info">
                <div className="product-type mono">{product.type}</div>
                <h3 className="product-name">{product.name}</h3>
                
                <div className="product-action">
                  <span className="product-price mono">₹{product.price}</span>
                  <button 
                    className="btn-outline add-to-cart-btn"
                    onClick={() => onAddToCart(product)}
                  >
                    <ShoppingCart size={18} /> ADD
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
