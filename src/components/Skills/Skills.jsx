import { useState } from 'react';
import './Skills.css';
import { skillCategories } from '../../portfolioData';
import { FaCode, FaServer, FaDatabase, FaCheckCircle } from 'react-icons/fa';

const categoryIcons = {
  'Frontend': FaCode,
  'Backend': FaServer,
  'Database': FaDatabase,
  'Programming Languages': FaCode
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section id="skills" className="skills">
      <div className="skills-container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">What I Know</span>
          <h2 className="section-title">My Skills</h2>
          <div className="title-underline"></div>
          <p className="section-description">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {skillCategories.map((category, index) => {
            const IconComponent = categoryIcons[category.category] || FaCode;
            return (
              <button
                key={index}
                className={`category-tab ${activeCategory === index ? 'active' : ''}`}
                onClick={() => setActiveCategory(index)}
              >
                <span className="tab-icon">{category.icon}</span>
                <span className="tab-name">{category.category}</span>
                <span className="tab-count">{category.skills.length}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Display */}
        <div className="skills-display">
          <div className="skills-grid">
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`skill-card ${hoveredSkill === index ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="skill-card-content">
                  <div className="skill-header">
                    <h3 className="skill-name">{skill.name}</h3>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  
                  <div className="skill-bar-container">
                    <div 
                      className="skill-bar"
                      style={{ 
                        width: `${hoveredSkill === index ? skill.level : 0}%`,
                        transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      <div className="skill-bar-glow"></div>
                    </div>
                    <div className="skill-bar-bg">
                      <div className="skill-bar-level" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>

                  <div className="skill-level-indicator">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>

                {/* Skill Card Decoration */}
                <div className="skill-card-decoration">
                  <div className="decoration-circle"></div>
                  <div className="decoration-dots"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Banner */}
          <div className="skills-info">
            <FaCheckCircle className="info-icon" />
            <p>
              Currently focusing on <span>React</span> and <span>Node.js</span> development
            </p>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="bg-decoration">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
      </div>
    </section>
  );
};

export default Skills;