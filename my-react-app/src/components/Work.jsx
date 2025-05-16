import React, { useState, useEffect } from 'react';
import '../styles/Work.css';
import LazyImage from './LazyImage';

function Work() {
  const [selectedFilter, setSelectedFilter] = useState('AI');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [showError, setShowError] = useState(false);
  
  const projects = [
    {
      id: 1,
      title: 'AI Image Generator',
      description: 'An advanced AI-powered image generation tool that creates realistic images from text descriptions using state-of-the-art machine learning models.',
      image: 'https://picsum.photos/id/96/800/500',
      technologies: ['React', 'Python', 'TensorFlow', 'OpenAI API', 'AWS Lambda'],
      categories: ['AI', 'Machine Learning', 'Creative']
    },
    {
      id: 2,
      title: 'Sentiment Analysis Tool',
      description: 'Natural language processing application that analyzes customer feedback and social media mentions to determine sentiment and key themes.',
      image: 'https://picsum.photos/id/42/800/500',
      technologies: ['Python', 'NLTK', 'spaCy', 'Scikit-learn', 'Flask'],
      categories: ['AI', 'Machine Learning', 'NLP']
    },
    {
      id: 3,
      title: 'E-commerce Platform',
      description: 'A fully responsive e-commerce platform with product filtering, cart functionality, and payment processing.',
      image: 'https://picsum.photos/id/180/800/500',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API'],
      categories: ['Web', 'AI', 'E-commerce']
    },
    {
      id: 4,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team collaboration features.',
      image: 'https://picsum.photos/id/48/800/500',
      technologies: ['React', 'Firebase', 'Material UI', 'Redux'],
      categories: ['Web', 'Productivity', 'Team']
    },
    {
      id: 5,
      title: 'Weather Dashboard',
      description: 'Interactive weather dashboard showing current conditions and forecasts for multiple locations.',
      image: 'https://picsum.photos/id/26/800/500',
      technologies: ['JavaScript', 'OpenWeather API', 'Chart.js', 'CSS Grid'],
      categories: ['Data', 'Weather', 'AI']
    },
    {
      id: 6,
      title: 'Portfolio Website',
      description: 'Personal portfolio website with responsive design and animated transitions.',
      image: 'https://picsum.photos/id/24/800/500',
      technologies: ['React', 'Framer Motion', 'Tailwind CSS', 'Netlify'],
      categories: ['Web', 'Design', 'Portfolio']
    }
  ];
  
  // Get all unique categories
  const allCategories = ['All', ...new Set(projects.flatMap(project => project.categories))];
  
  // Filter projects based on selected category
  useEffect(() => {
    if (selectedFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.categories.includes(selectedFilter)
      );
      setFilteredProjects(filtered);
    }
  }, [selectedFilter, projects]);
  
  // Handle filter change
  const handleFilterChange = (category) => {
    setSelectedFilter(category);
  };

  // This function will deliberately throw an error when called
  const triggerError = () => {
    throw new Error('This is a simulated internal server error for testing the ErrorBoundary component');
  };

  // If showError is true, this will cause the component to crash
  if (showError) {
    triggerError();
  }

  return (
    <div className="work-container">
      <h1>My Projects</h1>
      <p className="work-intro">Here's a collection of projects I've worked on, showcasing various technologies and skills.</p>
      
      <div className="error-test-section">
        <h2>Error Testing</h2>
        <p>Click the button below to simulate an internal server error and test error handling:</p>
        <button 
          className="error-button" 
          onClick={() => setShowError(true)}
        >
          Simulate Server Error
        </button>
      </div>
      
      <div className="filter-controls">
        <p>Filter by category:</p>
        <div className="filter-buttons">
          {allCategories.map(category => (
            <button 
              key={category} 
              className={`filter-btn ${selectedFilter === category ? 'active' : ''}`}
              onClick={() => handleFilterChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="projects-grid">
        {filteredProjects.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-image">
              <LazyImage src={project.image} alt={project.title} />
            </div>
            <div className="project-details">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="categories">
                <ul className="category-tags">
                  {project.categories.map((category, index) => (
                    <li 
                      key={index} 
                      className={`category-tag ${category === 'AI' ? 'ai-tag' : ''}`}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="technologies">
                <h3>Technologies:</h3>
                <ul>
                  {project.technologies.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="no-projects">
          <p>No projects found with the selected filter.</p>
        </div>
      )}
    </div>
  );
}

export default Work;