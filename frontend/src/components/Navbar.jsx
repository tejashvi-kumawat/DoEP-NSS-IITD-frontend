// src/components/Navbar.jsx
import React, { useState } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.logo}>
          <img src="/nss-logo.png" alt="NSS IIT Delhi" className={styles.logoImage} />
          <span className={styles.logoText}>NSS IIT Delhi</span>
        </div>
        
        <div className={`${styles.navMenu} ${isMenuOpen ? styles.navMenuOpen : ''}`}>
          <a href="/" className={styles.navLink}>Home</a>
          <a href="/contact" className={styles.navLink}>Contact</a>
        </div>
        
        <div className={styles.navActions}>
          <button className="btn btn-primary">Login</button>
          <button 
            className={styles.mobileMenuToggle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
