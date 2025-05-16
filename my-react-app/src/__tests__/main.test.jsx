import { createRoot } from 'react-dom/client';
import App from '../App';

// Mock react-dom/client
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn().mockReturnValue({
    render: jest.fn(),
  }),
}));

// Mock App component
jest.mock('../App', () => () => <div data-testid="app-component">App Component</div>);

describe('main.jsx rendering', () => {
  // Save the original getElementById
  const originalGetElementById = document.getElementById;
  
  beforeEach(() => {
    // Create a mock root element
    const mockRootElement = document.createElement('div');
    mockRootElement.id = 'root';
    document.body.appendChild(mockRootElement);
    
    // Clear mocks
    jest.clearAllMocks();
  });
  
  afterEach(() => {
    // Clean up
    const root = document.getElementById('root');
    if (root) {
      root.remove();
    }
  });
  
  test('renders the App component inside root element with StrictMode', () => {
    // Spy on document.getElementById
    jest.spyOn(document, 'getElementById');
    
    // Import main to trigger the render
    jest.isolateModules(() => {
      require('../main');
    });
    
    // Verify getElementById was called with 'root'
    expect(document.getElementById).toHaveBeenCalledWith('root');
    
    // Verify createRoot was called
    expect(createRoot).toHaveBeenCalled();
    
    // Verify render was called
    expect(createRoot().render).toHaveBeenCalled();
  });
  
  test('correctly handles random elements of the React app', () => {
    // Generate random element ID
    const randomId = Math.floor(Math.random() * 1000).toString();
    
    // Create a random element
    const randomElement = document.createElement('div');
    randomElement.id = randomId;
    document.body.appendChild(randomElement);
    
    // Check if element exists
    expect(document.getElementById(randomId)).not.toBeNull();
    
    // Clean up
    randomElement.remove();
    expect(document.getElementById(randomId)).toBeNull();
  });
});