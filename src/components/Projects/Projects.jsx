import { useState } from 'react';
import './Projects.css';
import { projects } from '../../portfolioData';
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaFolder, 
  FaCode,
  FaStar,
  FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  // Project icons based on title
  const projectIcons = {
    1: '📋', // Complaint Management
    2: '🪑', // Furniture
    3: '💪'  // Gym
  };

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Portfolio</span>
          <h2 className="section-title">Featured Projects</h2>
          <div className="title-underline"></div>
          <p className="section-description">
            Recent projects showcasing my development skills
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`project-card ${hoveredProject === project.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Icon/Preview */}
              <div className="project-preview">
                <div className="project-icon-wrapper">
                  <span className="project-emoji">{projectIcons[project.id]}</span>
                </div>
                <div className="preview-overlay">
                  <div className="overlay-links">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="overlay-link"
                      title="View Code"
                    >
                      <FaGithub />
                    </a>
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="overlay-link"
                      title="Live Demo"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                </div>
                <div className="preview-badge">{project.category}</div>
              </div>

              {/* Project Info */}
              <div className="project-body">
                <h3 className="project-title">
                  <FaFolder className="folder-icon" />
                  {project.title}
                </h3>
                
                <p className="project-description">
                  {project.description}
                </p>

                {/* Features List */}
                <div className="project-features">
                  <h4>
                    <FaStar className="features-icon" />
                    Key Features
                  </h4>
                  <ul>
                    {project.features.map((feature, index) => (
                      <li key={index}>
                        <FaCheckCircle className="check-icon" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="project-tech">
                  <h4>
                    <FaCode className="tech-icon" />
                    Tech Stack
                  </h4>
                  <div className="tech-tags">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="project-actions">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-btn github-btn"
                  >
                    <FaGithub />
                    Source Code
                    <FaArrowRight className="btn-arrow" />
                  </a>
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-btn demo-btn"
                  >
                    <FaExternalLinkAlt />
                    Live Demo
                    <FaArrowRight className="btn-arrow" />
                  </a>
                </div>

                {/* Git Stats (Decorative) */}
                <div className="git-stats">
                 
                  <span>
                    <FaStar />
                    Public
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="github-cta">
          <p>View all my projects on GitHub</p>
          <a 
            href="https://github.com/Bruk-Git" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-cta-btn"
          >
            <FaGithub />
            Visit My GitHub
            <FaArrowRight />
          </a>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="bg-decoration">
        <div className="floating-square square-1"></div>
        <div className="floating-square square-2"></div>
        <div className="dot-pattern"></div>
      </div>
    </section>
  );
};

export default Projects;