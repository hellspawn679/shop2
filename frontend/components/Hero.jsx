import React from 'react';
import ThreeShowpiece from './ThreeShowpiece';
import { Terminal, Globe, Coffee, Frown } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container hero-container">
        <div className="hero-content animate-fade-in">
          <div className="status-badge mono">
            <span className="blink">&gt;</span> STATUS: OVERWORKED
          </div>
          
          <h1 className="hero-title">
            Tech culture<br/>
            meets<br/>
            <span className="text-accent">streetwear.</span>
          </h1>
          
          <p className="hero-subtitle mono">
            For the overworked,<br/>
            underpaid and overstimulated. <span className="cursor blink"></span>
          </p>

          <button className="btn-primary" onClick={() => document.getElementById('shop').scrollIntoView()}>
            SHOP COLLECTION &rarr;
          </button>

          <div className="hero-features">
            <div className="feature-item">
              <Globe className="feature-icon" />
              <span>Designed<br/>for the 9 to 9</span>
            </div>
            <div className="feature-item">
              <Terminal className="feature-icon" />
              <span>Built for<br/>the overthinkers</span>
            </div>
            <div className="feature-item">
              <Coffee className="feature-icon" />
              <span>Fueled by<br/>caffeine</span>
            </div>
            <div className="feature-item">
              <Frown className="feature-icon" />
              <span>Mentally on<br/>PTO</span>
            </div>
          </div>
        </div>

        <div className="hero-visual animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-controls">
                <div className="terminal-dot" style={{ background: '#ff5f56' }}></div>
                <div className="terminal-dot" style={{ background: '#ffbd2e' }}></div>
                <div className="terminal-dot" style={{ background: '#27c93f' }}></div>
              </div>
              <span>~/life/surviving.sh</span>
            </div>
            <div className="terminal-body">
              <ThreeShowpiece />
              <div style={{ marginTop: '1rem' }}>
                <div>CAFFEINE.EXE &nbsp;&nbsp;&nbsp;&nbsp;[ ENABLED ]</div>
                <div>OVERWORKED.EXE &nbsp;&nbsp;[ ALWAYS ]</div>
                <div>SLEEP.EXE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ DISABLED ]</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
