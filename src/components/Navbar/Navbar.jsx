import { useState, useEffect } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#home" className="navbar-logo" onClick={handleLinkClick}>
          {'<Dev />'}
        </a>
        
        {/* Hamburger Menu Button */}
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="mobile-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Navigation Menu */}
        <div className={`navbar-menu-wrapper ${isMobileMenuOpen ? 'active' : ''}`}>
          {/* Close button inside menu */}
          {/* <button 
            className="mobile-close-btn"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaTimes />
          </button> */}

          <ul className="navbar-menu">
            <li><a href="#home" onClick={handleLinkClick}>Home</a></li>
            <li><a href="#about" onClick={handleLinkClick}>About</a></li>
            <li><a href="#skills" onClick={handleLinkClick}>Skills</a></li>
            <li><a href="#projects" onClick={handleLinkClick}>Projects</a></li>
            <li><a href="#contact" onClick={handleLinkClick}>Contact</a></li>
          </ul>

          {/* Social links in mobile menu */}
          <div className="mobile-social">
            <a href="https://github.com/Bruk-Git" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/bruk-tsegaye-6386a0326/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:bruktsegaye3@gmail.com">Email</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;