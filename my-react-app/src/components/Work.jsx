import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Work.css';
import LazyImage from './LazyImage';
import { getProjects, seedProjects } from '../api/projects';

function Work() {
  const [selectedFilter, setSelectedFilter] = useState('AI');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allCategories, setAllCategories] = useState(['All']);
  const [isRetrying, setIsRetrying] = useState(false);
  
  // Fetch projects from MongoDB
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // First try to seed the database with initial data (will only run once)
      const seedResult = await seedProjects();
      if (!seedResult.success) {
        console.warn('Seeding warning:', seedResult.error);
        // Continue even if seeding fails - data might already exist
      }
      
      // Then fetch the projects
      const result = await getProjects();
      
      if (result.success) {
        setProjects(result.data);
        
        // Extract all unique categories
        const categories = result.data.flatMap(project => project.categories);
        const uniqueCategories = ['All', ...new Set(categories)];
        setAllCategories(uniqueCategories);
      } else {
        setError(`Failed to fetch projects: ${result.error}`);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(`An error occurred: ${err.message}`);
    } finally {
      setLoading(false);
      setIsRetrying(false);
    }
  }, []);
  
  // Initial data load
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);
  
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
  
  // Handle retry when loading fails
  const handleRetry = () => {
    setIsRetrying(true);
    fetchProjects();
  };

  return (
    <div className="work-container" data-testid="work-container">
      <h1>My Projects</h1>
      <p className="work-intro">Here's a collection of projects I've worked on, showcasing various technologies and skills.</p>
      
      {loading ? (
        <div className="loading" data-testid="loading-state">
          <p>{isRetrying ? 'Retrying...' : 'Loading projects...'}</p>
        </div>
      ) : error ? (
        <div className="error" data-testid="error-state">
          <p>{error}</p>
          <button onClick={handleRetry} className="retry-button">
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div className="filter-controls">
            <p>Filter by category:</p>
            <div className="filter-buttons">
              {allCategories.map(category => (
                <button 
                  key={category} 
                  className={`filter-btn ${selectedFilter === category ? 'active' : ''}`}
                  onClick={() => handleFilterChange(category)}
                  aria-pressed={selectedFilter === category}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="projects-grid" data-testid="projects-grid">
            {filteredProjects.map(project => (
              <div key={project._id} className="project-card">
                <div className="project-image">
                  <LazyImage 
                    src={project.image} 
                    alt={project.title}
                    fallback="/placeholder-project.jpg" 
                  />
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
                          onClick={() => handleFilterChange(category)}
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
          
          {filteredProjects.length === 0 && !loading && (
            <div className="no-projects" data-testid="no-projects">
              <p>No projects found with the selected filter.</p>
              <button 
                onClick={() => setSelectedFilter('All')} 
                className="view-all-button"
              >
                View All Projects
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Work;