import React, { useState } from 'react';
import { ShieldAlert, Send } from 'lucide-react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [productData, setProductData] = useState({
    name: '',
    price: '',
    image: '',
    type: 'OVERSIZED TEE',
    status: 'IN_STOCK',
    designUrl: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'supersecret') {
      setIsAuthenticated(true);
    } else {
      setMessage('Invalid passcode');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      const data = await response.json();
      
      if (response.ok) {
        setMessage('SUCCESS: ' + data.message);
        setProductData({ ...productData, name: '', price: '', image: '', designUrl: '' });
      } else {
        setMessage('ERROR: ' + data.error);
      }
    } catch (err) {
      setMessage('ERROR: Server connection failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-container">
        <form onSubmit={handleLogin} className="glass-panel admin-form">
          <ShieldAlert size={48} className="text-accent" style={{ margin: '0 auto 1rem' }} />
          <h2 className="mono" style={{ textAlign: 'center' }}>[ ADMIN_ACCESS_REQUIRED ]</h2>
          <input 
            type="password" 
            placeholder="Enter Passcode" 
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="admin-input"
          />
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            AUTHENTICATE
          </button>
          {message && <p className="admin-msg error mono">{message}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="mono">ADMIN_DASHBOARD</h1>
        <p className="mono text-accent">Status: AUTHENTICATED</p>
      </div>

      <div className="admin-card glass-panel">
        <div className="card-header">
          <h2>Product Push System</h2>
          <p className="mono">Sync new designs with Qikink and Database</p>
        </div>

        <form onSubmit={handleSubmit} className="push-form">
          <div className="form-group">
            <label>Product Name</label>
            <input 
              type="text" 
              required 
              value={productData.name}
              onChange={(e) => setProductData({...productData, name: e.target.value})}
              className="admin-input"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Price (₹)</label>
              <input 
                type="number" 
                required 
                value={productData.price}
                onChange={(e) => setProductData({...productData, price: e.target.value})}
                className="admin-input"
              />
            </div>
            
            <div className="form-group">
              <label>Type</label>
              <select 
                value={productData.type}
                onChange={(e) => setProductData({...productData, type: e.target.value})}
                className="admin-input"
              >
                <option value="OVERSIZED TEE">OVERSIZED TEE</option>
                <option value="CLASSIC TEE">CLASSIC TEE</option>
                <option value="PREMIUM HOODIE">PREMIUM HOODIE</option>
                <option value="SWEATSHIRT">SWEATSHIRT</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Display Image URL (Mockup)</label>
            <input 
              type="url" 
              required 
              value={productData.image}
              onChange={(e) => setProductData({...productData, image: e.target.value})}
              className="admin-input"
            />
          </div>

          <div className="form-group">
            <label>Qikink Design URL (High Res)</label>
            <input 
              type="url" 
              required 
              value={productData.designUrl}
              onChange={(e) => setProductData({...productData, designUrl: e.target.value})}
              className="admin-input"
            />
          </div>

          {message && <div className={`admin-msg mono ${message.startsWith('ERROR') ? 'error' : 'success'}`}>{message}</div>}

          <button type="submit" className="btn-primary" disabled={isLoading} style={{ width: '100%', justifyContent: 'center' }}>
            <Send size={18} />
            {isLoading ? 'PUSHING_TO_QIKINK...' : 'PUSH_PRODUCT'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
