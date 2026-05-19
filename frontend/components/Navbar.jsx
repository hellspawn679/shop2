import React from 'react';
import { ShoppingBag, Search, User } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ cartCount, onOpenCart }) => {
  return (
    <nav className="navbar glass-panel">
      <div className="container nav-container">
        <div className="nav-brand">
          <span className="brand-title">OOO</span>
          <span className="brand-subtitle">STUDIO</span>
        </div>

        <div className="nav-links">
          <a href="#" className="active">HOME</a>
          <a href="#shop">SHOP</a>
          <a href="#collections">COLLECTIONS</a>
          <a href="#about">ABOUT</a>
        </div>

        <div className="nav-actions">
          <button className="icon-btn"><Search size={20} /></button>
          <button className="icon-btn"><User size={20} /></button>
          <button className="icon-btn cart-btn" onClick={onOpenCart}>
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
