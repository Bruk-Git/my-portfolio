import './Hero.css';
import { personalInfo } from '../../portfolioData';
import profilePic from '../../assets/images/profile.jpg';
import { FaGithub, FaLinkedin, FaTwitter, FaArrowRight } from 'react-icons/fa';
import { HiDownload } from 'react-icons/hi';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-badge">🚀 Available for Work</span>
            <h1 className="hero-greeting">
              Hello, I'm <br />
              <span className="hero-name">{personalInfo.name}</span>
            </h1>
            <div className="hero-typing">
              <span className="typing-text">{personalInfo.title}</span>
              <span className="cursor">|</span>
            </div>
            <p className="hero-description">
              Passionate developer crafting beautiful, functional web experiences. 
              I specialize in building modern applications with clean code and creative design.
            </p>
            
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                View My Work
                <FaArrowRight className="btn-icon" />
              </a>
              <a href="#contact" className="btn btn-outline">
                <HiDownload className="btn-icon" />
                Download CV
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">1+</span>
                <span className="stat-label">Year Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">2+</span>
                <span className="stat-label">Projects Done</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">0</span>
                <span className="stat-label">Happy Clients</span>
              </div>
            </div>

            <div className="hero-social">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-link">
                <FaGithub />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                <FaLinkedin />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaTwitter />
              </a>
              <span className="divider"></span>
              <span className="social-text">Find me on</span>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <div className="hero-image-container">
              <div className="image-border"></div>
              <img src={profilePic} alt={personalInfo.name} className="hero-image" />
              <div className="floating-card card-1">
                <span className="card-emoji">💡</span>
                <span>Creative Mind</span>
              </div>
              <div className="floating-card card-2">
                <span className="card-emoji">⚡</span>
                <span>Fast Learner</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span className="scroll-text">Scroll Down</span>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="bg-decoration">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="dots-pattern"></div>
        <div className="grid-pattern"></div>
      </div>
    </section>
  );
};

export default Hero;