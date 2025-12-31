import React from 'react';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>⚡</span>
          <span style={styles.logoText}>Algorithm Visualizer</span>
        </div>
        <div style={styles.links}>
          <a href="#" style={styles.link}>Home</a>
          <a href="#" style={styles.link}>About</a>
          <a href="#" style={styles.link}>Documentation</a>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: 'rgba(26, 31, 58, 0.8)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '1.25rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1.5rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  logoIcon: {
    fontSize: '1.75rem',
    filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))',
  },
  logoText: {
    letterSpacing: '-0.02em',
  },
  links: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  link: {
    color: 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',
    padding: '0.5rem 0',
    fontSize: '0.95rem',
    fontWeight: 500,
    position: 'relative',
    transition: 'all 0.2s ease',
  }
};

export default Navbar;