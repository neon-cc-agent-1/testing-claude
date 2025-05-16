import React, { useState, useEffect } from 'react';
import '../styles/Work.css';
import LazyImage from './LazyImage';

function Work() {
  const [selectedFilter, setSelectedFilter] = useState('AI');
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  const projects = [
    {
      id: 1,
      title: 'AI Image Generator',
      description: 'An advanced AI-powered image generation tool that creates realistic images from text descriptions using state-of-the-art machine learning models.',
      image: 'https://picsum.photos/id/96/800/500',
      technologies: [
        'React - Component-based UI library for building interactive interfaces with JSX syntax and hooks for state management',
        'Python - Backend processing language for AI model integration with FastAPI for high-performance endpoints',
        'TensorFlow - Machine learning framework for neural network implementation and model training',
        'OpenAI API - Advanced AI capabilities for image generation with DALL-E integration',
        'AWS Lambda - Serverless computing for scalable processing with API Gateway integration'
      ],
      categories: ['AI', 'Machine Learning', 'Creative']
    },
    {
      id: 2,
      title: 'Sentiment Analysis Tool',
      description: 'Natural language processing application that analyzes customer feedback and social media mentions to determine sentiment and key themes.',
      image: 'https://picsum.photos/id/42/800/500',
      technologies: [
        'Python - Core language for NLP processing pipeline with AsyncIO for concurrent processing',
        'NLTK - Natural Language Toolkit for text processing and analysis with custom tokenizers',
        'spaCy - Advanced NLP library for efficient language processing with named entity recognition',
        'Scikit-learn - Machine learning library for classification algorithms and feature extraction',
        'Flask - Lightweight web framework for API endpoints with Swagger documentation'
      ],
      categories: ['AI', 'Machine Learning', 'NLP']
    },
    {
      id: 3,
      title: 'E-commerce Platform',
      description: 'A fully responsive e-commerce platform with product filtering, cart functionality, and payment processing.',
      image: 'https://picsum.photos/id/180/800/500',
      technologies: [
        'React - Frontend library for building dynamic user interfaces with Redux for global state management',
        'Node.js - JavaScript runtime for server-side operations with Express middleware architecture',
        'Express - Web application framework for RESTful API development with JWT authentication',
        'MongoDB - NoSQL database for flexible product and user data storage with Mongoose ODM',
        'Stripe API - Secure payment processing integration with webhook event handling'
      ],
      categories: ['Web', 'AI', 'E-commerce']
    },
    {
      id: 4,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team collaboration features.',
      image: 'https://picsum.photos/id/48/800/500',
      technologies: [
        'React - UI library for building responsive task interfaces with custom hooks for complex state logic',
        'Firebase - Backend-as-a-Service for real-time database and authentication with Firestore listeners',
        'Material UI - Component library with pre-built design system and theming customization',
        'Redux - State management for predictable application data flow with Redux Toolkit for simplified setup'
      ],
      categories: ['Web', 'Productivity', 'Team']
    },
    {
      id: 5,
      title: 'Weather Dashboard',
      description: 'Interactive weather dashboard showing current conditions and forecasts for multiple locations.',
      image: 'https://picsum.photos/id/26/800/500',
      technologies: [
        'JavaScript - Core programming language for frontend functionality with ES6+ features and async/await',
        'OpenWeather API - Weather data provider with global coverage and 5-day forecast endpoints',
        'Chart.js - Interactive data visualization library for weather metrics with responsive canvas rendering',
        'CSS Grid - Modern layout system for responsive dashboard design with Flexbox fallbacks'
      ],
      categories: ['Data', 'Weather', 'AI']
    },
    {
      id: 6,
      title: 'Portfolio Website',
      description: 'Personal portfolio website with responsive design and animated transitions.',
      image: 'https://picsum.photos/id/24/800/500',
      technologies: [
        'React - Component-based UI library for single-page application with React Router for navigation',
        'Framer Motion - Animation library for smooth interface transitions with gesture recognition',
        'Tailwind CSS - Utility-first CSS framework for rapid styling with custom design system extension',
        'Netlify - Deployment and hosting platform with CI/CD integration and serverless functions'
      ],
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

  return (
    <div className="work-container">
      <h1>My Projects</h1>
      <p className="work-intro">Here's a collection of projects I've worked on, showcasing various technologies and skills.</p>
      
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