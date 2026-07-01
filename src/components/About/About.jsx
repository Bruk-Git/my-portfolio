import './About.css';
import { personalInfo, aboutDetails, experiences } from '../../portfolioData';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaLaptopCode,
  FaHeart,
  FaQuoteLeft,
  FaArrowRight,
  FaCalendar,
  FaLanguage,
  FaStar,
  FaBookOpen,
  FaUniversity
} from 'react-icons/fa';
// REMOVE THIS LINE: import { SiAdmasuniversity } from 'react-icons/si';
import { HiAcademicCap, HiCode } from 'react-icons/hi';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Get To Know Me</span>
          <h2 className="section-title">About Me</h2>
          <div className="title-underline"></div>
        </div>

        <div className="about-grid">
          
          {/* LEFT COLUMN - Bio & Education */}
          <div className="about-left">
            
            {/* Bio Card */}
            <div className="card bio-card">
              <div className="card-header">
                <FaLaptopCode className="card-header-icon" />
                <h3>Who I Am</h3>
              </div>
              <div className="card-body">
                <p className="bio-text">
                  <FaQuoteLeft className="quote-icon" />
                  {personalInfo.description}
                </p>
                <p className="bio-text">
                  As a junior developer, I'm passionate about creating clean, 
                  efficient code and building intuitive user experiences. 
                  Every project is an opportunity to learn and grow.
                </p>
                <div className="bio-tags">
                  <span className="tag">{aboutDetails.location}</span>
                  {aboutDetails.languages.map((lang, index) => (
                    <span key={index} className="tag">{lang}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Education Card */}
            <div className="card education-card">
              <div className="card-header">
                <HiAcademicCap className="card-header-icon" />
                <h3>Education</h3>
              </div>
              <div className="card-body">
                <div className="education-main">
                  <div className="edu-icon-wrapper">
                    <FaUniversity className="edu-icon" />
                  </div>
                  <div className="edu-details">
                    <h4 className="edu-degree">{aboutDetails.education.degree}</h4>
                    <p className="edu-school">
                      {aboutDetails.education.university}
                    </p>
                    <div className="edu-meta">
                      <span className="edu-period">
                        <FaCalendar className="meta-icon" />
                        {aboutDetails.education.period}
                      </span>
                      <span className="edu-status">
                        <FaStar className="meta-icon" />
                        {aboutDetails.education.status}
                      </span>
                    </div>
                    <p className="edu-description">
                      {aboutDetails.education.description}
                    </p>
                  </div>
                </div>

                {/* Future Goal */}
                <div className="future-goal">
                  <div className="goal-line"></div>
                  <div className="goal-content">
                    <FaGraduationCap className="goal-icon" />
                    <div>
                      <h5>Future Goal</h5>
                      <p>{aboutDetails.education.futureGoal}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Experience & Social */}
          <div className="about-right">
            
            {/* Experience Card */}
            <div className="card experience-card">
              <div className="card-header">
                <HiCode className="card-header-icon" />
                <h3>Experience</h3>
              </div>
              <div className="card-body">
                <div className="timeline">
                  {experiences.map((exp, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <span className="timeline-year">{exp.year}</span>
                        <h4>{exp.role}</h4>
                        <p className="timeline-company">{exp.company}</p>
                        <p className="timeline-description">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="card social-card">
              <div className="card-header">
                <FaHeart className="card-header-icon" />
                <h3>Connect With Me</h3>
              </div>
              <div className="card-body">
                <p className="social-intro">
                  Let's connect and build something amazing together!
                </p>
                <div className="social-links-grid">
                  <a 
                    href={personalInfo.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link-card github"
                  >
                    <FaGithub className="social-icon" />
                    <div className="social-info">
                      <span className="social-platform">GitHub</span>
                      <span className="social-username">View my code</span>
                    </div>
                    <FaArrowRight className="social-arrow" />
                  </a>

                  <a 
                    href={personalInfo.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link-card linkedin"
                  >
                    <FaLinkedin className="social-icon" />
                    <div className="social-info">
                      <span className="social-platform">LinkedIn</span>
                      <span className="social-username">Professional profile</span>
                    </div>
                    <FaArrowRight className="social-arrow" />
                  </a>

                  <a 
                    href={personalInfo.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link-card twitter"
                  >
                    <FaTwitter className="social-icon" />
                    <div className="social-info">
                      <span className="social-platform">Twitter</span>
                      <span className="social-username">Follow me</span>
                    </div>
                    <FaArrowRight className="social-arrow" />
                  </a>

                  <a 
                    href={personalInfo.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link-card instagram"
                  >
                    <FaInstagram className="social-icon" />
                    <div className="social-info">
                      <span className="social-platform">Instagram</span>
                      <span className="social-username">Daily updates</span>
                    </div>
                    <FaArrowRight className="social-arrow" />
                  </a>
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className="card interests-card">
              <div className="card-header">
                <FaBookOpen className="card-header-icon" />
                <h3>Interests</h3>
              </div>
              <div className="card-body">
                <div className="interests-list">
                  {aboutDetails.interests.map((interest, index) => (
                    <span key={index} className="interest-tag">{interest}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;