import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
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
              <Link to={`/product/${product.handle}`} className="product-link-wrapper" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-status mono">
                    [{product.status}]
                  </div>
                  {product.colorCount > 1 && (
                    <div className="product-color-count mono" style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(0,0,0,0.8)', padding: '0.25rem 0.5rem', fontSize: '0.7rem', color: '#fff', border: '1px solid #333' }}>
                      [+ {product.colorCount} COLORS]
                    </div>
                  )}
                </div>
                
                <div className="product-info">
                  <div className="product-type mono">{product.type}</div>
                  <h3 className="product-name">{product.name}</h3>
                  
                  <div className="product-price mono" style={{ marginBottom: '1rem' }}>₹{product.price}</div>
                </div>
              </Link>
              
              <div className="product-action" style={{ padding: '0 1.5rem 1.5rem' }}>
                {product.hasVariants ? (
                  <Link 
                    to={`/product/${product.handle}`}
                    className="btn-outline add-to-cart-btn"
                    style={{ width: '100%', textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
                  >
                    SELECT OPTIONS
                  </Link>
                ) : (
                  <button 
                    className="btn-outline add-to-cart-btn"
                    style={{ width: '100%' }}
                    onClick={(e) => {
                      e.preventDefault();
                      onAddToCart(product);
                    }}
                  >
                    <ShoppingCart size={18} style={{ marginRight: '0.5rem' }} /> ADD TO CART
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
