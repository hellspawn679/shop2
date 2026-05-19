import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { fetchProduct } from '../utils/shopify';
import './ProductDetail.css';

const ProductDetail = ({ onAddToCart }) => {
  const { handle } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [activeImage, setActiveImage] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentVariant, setCurrentVariant] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetchProduct(handle).then(data => {
      setProduct(data);
      if (data) {
        setActiveImage(data.images.length > 0 ? data.images[0] : '');
        
        // Initialize default options
        const defaultOptions = {};
        if (data.options) {
          data.options.forEach((opt, idx) => {
            defaultOptions[`option${idx + 1}`] = opt.values[0];
          });
        }
        setSelectedOptions(defaultOptions);
        
        // Find default variant
        const variant = data.variants.find(v => 
          data.options.every((opt, idx) => v.options[idx] === defaultOptions[`option${idx + 1}`])
        );
        setCurrentVariant(variant || data.variants[0]);
      }
      setLoading(false);
    });
  }, [handle]);

  const handleOptionChange = (optionIndex, value) => {
    const newOptions = { ...selectedOptions, [`option${optionIndex}`]: value };
    setSelectedOptions(newOptions);
    
    // Find matching variant
    if (product && product.variants) {
      const variant = product.variants.find(v => 
        product.options.every((opt, idx) => v.options[idx] === newOptions[`option${idx + 1}`])
      );
      if (variant) {
        setCurrentVariant(variant);
        if (variant.featured_image) {
          setActiveImage(variant.featured_image);
        }
      } else {
        setCurrentVariant(null);
      }
    }
  };

  const handleAddToCart = () => {
    if (currentVariant && currentVariant.available) {
      onAddToCart({
        id: currentVariant.id,
        name: `${product.name} - ${currentVariant.title}`,
        price: currentVariant.price,
        image: currentVariant.featured_image || activeImage,
        handle: product.handle
      });
    }
  };

  if (loading) {
    return (
      <div className="product-detail-section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="mono" style={{ color: 'var(--accent)', fontSize: '1.5rem' }}>
          [ LOADING_PRODUCT_DATA... ]
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-section" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2 className="detail-title">404_NOT_FOUND</h2>
        <button className="btn-outline mono" onClick={() => navigate('/')}>
          <ArrowLeft size={18} /> RETURN_TO_ROOT
        </button>
      </div>
    );
  }

  const isAvailable = currentVariant ? currentVariant.available : false;
  const currentPrice = currentVariant ? currentVariant.price : product.price;

  return (
    <section className="product-detail-section animate-fade-in">
      <div className="container">
        
        <button 
          className="icon-btn mono" 
          onClick={() => navigate('/')}
          style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={16} /> cd ..
        </button>

        <div className="product-detail-container">
          <div className="product-gallery">
            <div className="main-image-container glass-panel">
              <img src={activeImage || product.image} alt={product.name} className="main-image" />
              <div className="product-status mono" style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(0,0,0,0.8)', padding: '0.25rem 0.75rem', border: '1px solid var(--accent)', color: 'var(--accent)' }}>
                [{isAvailable ? 'IN_STOCK' : 'SOLD_OUT'}]
              </div>
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="thumbnail-strip">
                {product.images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`thumbnail-container glass-panel ${activeImage === img ? 'active-thumb' : ''}`}
                    onClick={() => setActiveImage(img)}
                  >
                    <img src={img} alt={`${product.name} ${idx}`} className="thumbnail-image" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="product-detail-info">
            <div className="detail-type mono">~/catalog/{product.type.toLowerCase().replace(' ', '_')}</div>
            <h1 className="detail-title">{product.name}</h1>
            <div className="detail-price mono">₹{currentPrice}</div>

            {product.options && product.options.map((opt, optIdx) => (
              <div key={opt.name} className="product-option-group">
                <div className="option-name mono">--{opt.name.toLowerCase()}</div>
                <div className="option-values">
                  {opt.values.map(val => (
                    <button
                      key={val}
                      className={`option-btn mono ${selectedOptions[`option${optIdx + 1}`] === val ? 'active-option' : ''}`}
                      onClick={() => handleOptionChange(optIdx + 1, val)}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="detail-description" dangerouslySetInnerHTML={{ __html: product.description }} />

            <div className="add-to-cart-wrapper">
              <button 
                className="btn-primary detail-add-btn mono"
                onClick={handleAddToCart}
                disabled={!isAvailable}
              >
                <ShoppingCart size={20} /> 
                {!isAvailable ? 'UNAVAILABLE' : 'EXECUTE_ADD_TO_CART'}
              </button>
            </div>

            <div className="tech-specs mono">
              <div className="spec-item">
                <span className="spec-label">SYSTEM_STATUS</span>
                <span>OPERATIONAL</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">SHIPPING</span>
                <span>STANDARD_DELIVERY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
