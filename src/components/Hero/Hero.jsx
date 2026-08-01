import "./Hero.css";
import { FaGithub, FaLinkedin, FaTwitter, FaArrowRight } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-badge">🚀 Available for Work</span>
            <h1 className="hero-greeting">
              Hello, I'm <br />
              <span className="hero-name">Bruk</span>
            </h1>
            <div className="hero-typing">
              <span className="typing-text">Junior Full Stack Developer</span>
            </div>
            <p className="hero-description">
              Computer Science student at Admas University. Passionate developer
              crafting beautiful, functional web experiences.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                View My Work
                <FaArrowRight className="btn-icon" />
              </a>
              <a href="#contact" className="btn btn-outline">
                <HiDownload className="btn-icon" />
                Contact Me
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">2+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10+</span>
                <span className="stat-label">Projects Done</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">Skills</span>
              </div>
            </div>

            <div className="hero-social">
              <a
                href="https://github.com/Bruk-Git"
                target="_blank"
                className="social-link"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                className="social-link"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                className="social-link"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <div className="hero-image-container">
              <div className="image-placeholder">
                <span>B</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
