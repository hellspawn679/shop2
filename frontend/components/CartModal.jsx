import React, { useState } from 'react';
import { X, Trash2, CreditCard } from 'lucide-react';
import './CartModal.css';

const CartModal = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    setIsProcessing(true);
    // Since items are already being added to the Shopify cart via the /cart/add.js API
    // in App.jsx, we simply need to redirect the user to the native Shopify checkout.
    window.location.href = '/checkout';
  };

  if (!isOpen) return null;

  return (
    <div className="cart-overlay animate-fade-in">
      <div className="cart-modal glass-panel">
        <div className="cart-header">
          <h2 className="mono">[$ open --cart]</h2>
          <button className="icon-btn" onClick={onClose}><X /></button>
        </div>

        <div className="cart-body">
          {checkoutSuccess ? (
            <div className="checkout-success mono">
              <div style={{ color: 'var(--accent)', fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
              <h3>PAYMENT_SUCCESSFUL</h3>
              <p>Your order has been routed to Qikink API.</p>
              <button className="btn-primary" style={{ marginTop: '2rem' }} onClick={onClose}>
                CONTINUE_SHOPPING
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="empty-cart mono">
              <p>CART_IS_EMPTY</p>
              <button className="btn-outline" onClick={onClose} style={{ marginTop: '2rem' }}>
                RETURN_TO_SHOP
              </button>
            </div>
          ) : (
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <div className="cart-item-price mono">₹{item.price}</div>
                    
                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span className="mono">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <button className="icon-btn remove-btn" onClick={() => onRemove(item.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!checkoutSuccess && items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>TOTAL</span>
              <span className="mono text-accent">₹{total}</span>
            </div>
            
            <button 
              className="btn-primary checkout-btn" 
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              <CreditCard size={18} />
              {isProcessing ? 'PROCESSING_PAYMENT...' : 'CHECKOUT_VIA_RAZORPAY'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
