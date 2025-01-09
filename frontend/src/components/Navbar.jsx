import React from 'react';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        Algorithm Visualizer
      </div>
      <div style={styles.links}>
        <a href="#" style={styles.link}>Home</a>
        <a href="#" style={styles.link}>About</a>
        <a href="#" style={styles.link}>Documentation</a>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#333',
    color: 'white',
    borderRadius: '4px',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  links: {
    display: 'flex',
    gap: '1rem',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem',
  }
};

export default Navbar;