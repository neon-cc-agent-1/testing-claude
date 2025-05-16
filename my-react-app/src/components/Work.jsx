import { useState, useEffect } from 'react'
import '../styles/Work.css'

function Work() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [highlightedTech, setHighlightedTech] = useState(null)
  
  // Add effect to clear highlight when filter changes
  useEffect(() => {
    if (activeFilter === 'all') {
      setHighlightedTech(null);
    }
  }, [activeFilter]);
  
  const projects = [
    {
      id: 1,
      name: 'E-Commerce Platform',
      image: 'https://via.placeholder.com/400x300/4a5568/ffffff?text=E-Commerce',
      description: 'A full-featured online shopping platform with product catalog, cart, and checkout.',
      technologies: [
        { name: 'React', category: 'frontend' },
        { name: 'Node.js', category: 'backend' },
        { name: 'Express', category: 'backend' },
        { name: 'MongoDB', category: 'database' },
        { name: 'Stripe API', category: 'service' },
        { name: 'Redux', category: 'frontend' }
      ]
    },
    {
      id: 2,
      name: 'Social Media Dashboard',
      image: 'https://via.placeholder.com/400x300/4299e1/ffffff?text=Dashboard',
      description: 'Analytics dashboard for social media performance tracking and content management.',
      technologies: [
        { name: 'React', category: 'frontend' },
        { name: 'TypeScript', category: 'language' },
        { name: 'Chart.js', category: 'frontend' },
        { name: 'Firebase', category: 'database' },
        { name: 'Material UI', category: 'frontend' },
        { name: 'Social Media APIs', category: 'service' }
      ]
    },
    {
      id: 3,
      name: 'Task Management App',
      image: 'https://via.placeholder.com/400x300/68d391/ffffff?text=Tasks',
      description: 'Collaborative task management application with real-time updates and team features.',
      technologies: [
        { name: 'React', category: 'frontend' },
        { name: 'Socket.io', category: 'backend' },
        { name: 'Express', category: 'backend' },
        { name: 'PostgreSQL', category: 'database' },
        { name: 'TailwindCSS', category: 'frontend' },
        { name: 'Redis', category: 'database' }
      ]
    },
    {
      id: 4,
      name: 'Content Management System',
      image: 'https://via.placeholder.com/400x300/ed8936/ffffff?text=CMS',
      description: 'Custom CMS with content editing, user roles, and media management capabilities.',
      technologies: [
        { name: 'React', category: 'frontend' },
        { name: 'GraphQL', category: 'backend' },
        { name: 'Node.js', category: 'backend' },
        { name: 'MongoDB', category: 'database' },
        { name: 'AWS S3', category: 'service' },
        { name: 'Jest', category: 'testing' }
      ]
    }
  ]

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Database' },
    { id: 'language', label: 'Languages' },
    { id: 'service', label: 'Services' },
    { id: 'testing', label: 'Testing' }
  ]

  // Filter projects based on active filter and highlighted tech
  const filteredProjects = (() => {
    // Filter by category
    let filtered = activeFilter === 'all'
      ? projects
      : projects.filter(project => 
          project.technologies.some(tech => tech.category === activeFilter)
        );
        
    // Further filter by specific technology if one is highlighted
    if (highlightedTech) {
      filtered = filtered.filter(project => 
        project.technologies.some(tech => tech.name === highlightedTech)
      );
    }
    
    return filtered;
  })()

  return (
    <div className="work-container">
      <div className="work-header">
        <h1>Our Projects</h1>
        <p>Explore our portfolio and discover the technologies powering each solution</p>
        {filteredProjects.length === 0 && (
          <div className="no-results">
            <p>No projects match the current filters. Try selecting a different technology or category.</p>
            <button onClick={() => {setActiveFilter('all'); setHighlightedTech(null)}}>Show All Projects</button>
          </div>
        )}
      </div>

      <div className="technologies-overview">
        <h2>Technologies We Use</h2>
        <p>We leverage modern technologies to build robust and scalable applications</p>
        <div className="tech-categories">
          <div className="tech-category">
            <h3>Frontend</h3>
            <div className="tech-list">
              <span 
                className="tech-item" 
                onClick={() => { 
                  setHighlightedTech('React'); 
                  setActiveFilter('frontend');
                }}
              >
                React
              </span>
              <span 
                className="tech-item" 
                onClick={() => { 
                  setHighlightedTech('TypeScript'); 
                  setActiveFilter('language');
                }}
              >
                TypeScript
              </span>
              <span 
                className="tech-item" 
                onClick={() => { 
                  setHighlightedTech('TailwindCSS'); 
                  setActiveFilter('frontend');
                }}
              >
                TailwindCSS
              </span>
              <span 
                className="tech-item" 
                onClick={() => { 
                  setHighlightedTech('Material UI'); 
                  setActiveFilter('frontend');
                }}
              >
                Material UI
              </span>
            </div>
          </div>
          <div className="tech-category">
            <h3>Backend</h3>
            <div className="tech-list">
              <span 
                className="tech-item" 
                onClick={() => { 
                  setHighlightedTech('Node.js'); 
                  setActiveFilter('backend');
                }}
              >
                Node.js
              </span>
              <span 
                className="tech-item" 
                onClick={() => { 
                  setHighlightedTech('Express'); 
                  setActiveFilter('backend');
                }}
              >
                Express
              </span>
              <span 
                className="tech-item" 
                onClick={() => { 
                  setHighlightedTech('GraphQL'); 
                  setActiveFilter('backend');
                }}
              >
                GraphQL
              </span>
              <span 
                className="tech-item" 
                onClick={() => { 
                  setHighlightedTech('Socket.io'); 
                  setActiveFilter('backend');
                }}
              >
                Socket.io
              </span>
            </div>
          </div>
          <div className="tech-category">
            <h3>Database</h3>
            <div className="tech-list">
              <span 
                className="tech-item" 
                onClick={() => { 
                  setHighlightedTech('MongoDB'); 
                  setActiveFilter('database');
                }}
              >
                MongoDB
              </span>
              <span 
                className="tech-item" 
                onClick={() => { 
                  setHighlightedTech('PostgreSQL'); 
                  setActiveFilter('database');
                }}
              >
                PostgreSQL
              </span>
              <span 
                className="tech-item" 
                onClick={() => { 
                  setHighlightedTech('Firebase'); 
                  setActiveFilter('database');
                }}
              >
                Firebase
              </span>
              <span 
                className="tech-item" 
                onClick={() => { 
                  setHighlightedTech('Redis'); 
                  setActiveFilter('database');
                }}
              >
                Redis
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="filter-container">
        <h2>Project Filters</h2>
        <div className="filter-info">
          {highlightedTech ? (
            <p className="filter-message">
              Showing projects using <span className="highlighted-tech">{highlightedTech}</span> 
              {activeFilter !== 'all' && <> in the <span className="category-name">{filters.find(f => f.id === activeFilter)?.label}</span> category</>}
              <button 
                className="clear-filter" 
                onClick={() => setHighlightedTech(null)}
              >
                Clear
              </button>
            </p>
          ) : null}
        </div>
        <div className="filter-buttons">
          {filters.map(filter => (
            <button 
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="project-grid">
        {filteredProjects.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-image">
              <img src={project.image} alt={project.name} />
            </div>
            <div className="project-content">
              <h3>{project.name}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="tech-tags">
                <h4>Technologies Used:</h4>
                <div className="tags-container">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className={`tech-tag ${tech.category} ${highlightedTech === tech.name ? 'highlighted' : ''}`}
                      onClick={() => setHighlightedTech(tech.name === highlightedTech ? null : tech.name)}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Work