import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">NSS IIT Delhi</h4>
            <p className="mb-4">Digitalizing education projects to create lasting impact in communities.</p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-white transition-colors">📘</a>
              <a href="#" aria-label="Twitter" className="hover:text-white transition-colors">🐦</a>
              <a href="#" aria-label="Instagram" className="hover:text-white transition-colors">📷</a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors">💼</a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/projects" className="hover:text-white transition-colors">Projects</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Projects</h4>
            <ul className="space-y-2">
              <li><a href="https://munirka.nssiitd.in" className="hover:text-white transition-colors">Munirka Teaching</a></li>
              <li><a href="https://vidya.nssiitd.in" className="hover:text-white transition-colors">Vidya Digital</a></li>
              <li><a href="https://sampark.nssiitd.in" className="hover:text-white transition-colors">Sampark Connect</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Contact</h4>
            <p className="mb-2">IIT Delhi Campus<br />Hauz Khas, New Delhi - 110016</p>
            <p>Email: nss@iitd.ac.in</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">&copy; 2024 NSS IIT Delhi. All rights reserved.</p>
            <div className="space-x-6">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
