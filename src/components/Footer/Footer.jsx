import './Footer.css';
import { personalInfo } from '../../portfolioData';
import { 
  FaHeart, 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram,
  FaArrowUp,
  FaDev,
  FaCode
} from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              <FaCode className="logo-icon" />
              <span>{personalInfo.name.split(' ')[0]}<span className="logo-dot">.</span></span>
            </a>
            <p className="footer-tagline">
              Building digital experiences with passion and creativity.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-nav">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-social">
              <h4>Connect</h4>
              <div className="social-links">
                <a 
                  href={personalInfo.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  title="GitHub"
                >
                  <FaGithub />
                </a>
                <a 
                  href={personalInfo.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  title="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a 
                  href={personalInfo.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  title="Twitter"
                >
                  <FaTwitter />
                </a>
                <a 
                  href={personalInfo.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  title="Instagram"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>

            <div className="footer-cta">
              <h4>Let's Work Together</h4>
              <p>Have a project in mind?</p>
              <a href="#contact" className="footer-cta-btn">
                Hire Me
                <FaArrowUp className="cta-arrow" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider">
          <div className="divider-line"></div>
          <div className="divider-icon">
            <FaDev />
          </div>
          <div className="divider-line"></div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="made-with">
            Made with <FaHeart className="heart-icon" /> using React
          </p>
          <button 
            className="scroll-top-btn"
            onClick={scrollToTop}
            title="Back to top"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="footer-bg-pattern"></div>
    </footer>
  );
};

export default Footer;