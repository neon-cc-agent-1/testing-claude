import Project from '../db/models/Project';
import connectDB from '../db/mongodb';

/**
 * Get all projects from the database
 * @param {Object} options - Optional parameters
 * @param {Object} options.filter - MongoDB filter object
 * @param {Object} options.sort - Sort criteria (default: newest first)
 * @param {Number} options.limit - Maximum number of projects to return
 * @returns {Promise<Object>} Success status and project data or error
 */
export const getProjects = async (options = {}) => {
  try {
    await connectDB();
    
    const { filter = {}, sort = { createdAt: -1 }, limit = 0 } = options;
    
    let query = Project.find(filter);
    
    // Apply sorting
    if (sort) {
      query = query.sort(sort);
    }
    
    // Apply limit
    if (limit > 0) {
      query = query.limit(limit);
    }
    
    const projects = await query.exec();
    
    return { 
      success: true, 
      data: projects,
      count: projects.length
    };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { 
      success: false, 
      error: error.message,
      code: error.code || 'UNKNOWN_ERROR'
    };
  }
};

/**
 * Create a new project
 * @param {Object} projectData - The project data
 * @returns {Promise<Object>} Success status and created project or error
 */
export const createProject = async (projectData) => {
  try {
    if (!projectData || Object.keys(projectData).length === 0) {
      throw new Error('Project data is required');
    }

    await connectDB();
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'image'];
    for (const field of requiredFields) {
      if (!projectData[field]) {
        throw new Error(`${field} is required`);
      }
    }
    
    const project = await Project.create(projectData);
    return { 
      success: true, 
      data: project,
      message: 'Project created successfully'
    };
  } catch (error) {
    console.error('Error creating project:', error);
    return { 
      success: false, 
      error: error.message,
      code: error.code || 'UNKNOWN_ERROR',
      validationErrors: error.errors ? Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      })) : null
    };
  }
};

/**
 * Get a project by ID
 * @param {string} id - Project ID
 * @returns {Promise<Object>} Success status and project data or error
 */
export const getProjectById = async (id) => {
  try {
    if (!id) {
      throw new Error('Project ID is required');
    }
    
    await connectDB();
    const project = await Project.findById(id);
    
    if (!project) {
      return { 
        success: false, 
        error: 'Project not found',
        code: 'NOT_FOUND'
      };
    }
    
    return { success: true, data: project };
  } catch (error) {
    console.error(`Error fetching project with id ${id}:`, error);
    return { 
      success: false, 
      error: error.message,
      code: error.name === 'CastError' ? 'INVALID_ID' : (error.code || 'UNKNOWN_ERROR')
    };
  }
};

/**
 * Function to seed initial projects data
 * @returns {Promise<Object>} Success status and message or error
 */
export const seedProjects = async () => {
  try {
    await connectDB();
    
    // Check if projects already exist
    const count = await Project.countDocuments();
    if (count > 0) {
      console.log(`${count} projects already exist in database`);
      return { 
        success: true, 
        message: 'Projects already exist',
        count
      };
    }
    
    // Initial projects data
    const projectsData = [
      {
        title: 'AI Image Generator',
        description: 'An advanced AI-powered image generation tool that creates realistic images from text descriptions using state-of-the-art machine learning models.',
        image: 'https://picsum.photos/id/96/800/500',
        technologies: ['React', 'Python', 'TensorFlow', 'OpenAI API', 'AWS Lambda'],
        categories: ['AI', 'Machine Learning', 'Creative']
      },
      {
        title: 'Sentiment Analysis Tool',
        description: 'Natural language processing application that analyzes customer feedback and social media mentions to determine sentiment and key themes.',
        image: 'https://picsum.photos/id/42/800/500',
        technologies: ['Python', 'NLTK', 'spaCy', 'Scikit-learn', 'Flask'],
        categories: ['AI', 'Machine Learning', 'NLP']
      },
      {
        title: 'E-commerce Platform',
        description: 'A fully responsive e-commerce platform with product filtering, cart functionality, and payment processing.',
        image: 'https://picsum.photos/id/180/800/500',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API'],
        categories: ['Web', 'AI', 'E-commerce']
      },
      {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates and team collaboration features.',
        image: 'https://picsum.photos/id/48/800/500',
        technologies: ['React', 'MongoDB', 'Material UI', 'Redux'],
        categories: ['Web', 'Productivity', 'Team']
      },
      {
        title: 'Weather Dashboard',
        description: 'Interactive weather dashboard showing current conditions and forecasts for multiple locations.',
        image: 'https://picsum.photos/id/26/800/500',
        technologies: ['JavaScript', 'OpenWeather API', 'Chart.js', 'CSS Grid'],
        categories: ['Data', 'Weather', 'AI']
      },
      {
        title: 'Portfolio Website',
        description: 'Personal portfolio website with responsive design and animated transitions.',
        image: 'https://picsum.photos/id/24/800/500',
        technologies: ['React', 'Framer Motion', 'Tailwind CSS', 'Netlify'],
        categories: ['Web', 'Design', 'Portfolio']
      }
    ];
    
    // Insert projects
    const result = await Project.insertMany(projectsData);
    
    console.log(`Database seeded with ${result.length} initial projects`);
    return { 
      success: true, 
      message: 'Database seeded successfully',
      count: result.length
    };
  } catch (error) {
    console.error('Error seeding database:', error);
    return { 
      success: false, 
      error: error.message,
      code: error.code || 'UNKNOWN_ERROR'
    };
  }
};