// src/components/Footer.jsx
import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4>NSS IIT Delhi</h4>
            <p>Digitalizing education projects to create lasting impact in communities.</p>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="LinkedIn">💼</a>
            </div>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Quick Links</h4>
            <ul className={styles.footerLinks}>
              <li><a href="/">Home</a></li>
              <li><a href="/projects">Projects</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Projects</h4>
            <ul className={styles.footerLinks}>
              <li><a href="https://munirka.nssiitd.in">Munirka Teaching</a></li>
              <li><a href="https://vidya.nssiitd.in">Vidya Digital</a></li>
              <li><a href="https://sampark.nssiitd.in">Sampark Connect</a></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Contact</h4>
            <p>IIT Delhi Campus<br />Hauz Khas, New Delhi - 110016</p>
            <p>Email: nss@iitd.ac.in</p>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; 2024 NSS IIT Delhi. All rights reserved.</p>
          <div className={styles.footerBottomLinks}>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
