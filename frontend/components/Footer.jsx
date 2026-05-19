import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer section">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="brand-title">OOO</div>
          <div className="brand-subtitle">STUDIO</div>
          <p className="footer-tagline mono">Tech culture meets streetwear.</p>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h4>SHOP</h4>
            <a href="#">All Products</a>
            <a href="#">T-Shirts</a>
            <a href="#">Hoodies</a>
            <a href="#">Accessories</a>
          </div>
          
          <div className="link-group">
            <h4>INFO</h4>
            <a href="#">About Us</a>
            <a href="#">Shipping & Returns</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
          
          <div className="link-group">
            <h4>SYSTEM</h4>
            <a href="#" className="mono">Status: All Systems Operational</a>
            <a href="#" className="mono">Version: 1.0.0-beta</a>
            <a href="#" className="mono">Ping: 12ms</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} OOO Studio. All rights reserved.</p>
          <p className="mono">Designed in dark mode.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
