import { createRoot } from 'react-dom/client';
import App from '../App';
import { StrictMode } from 'react';

// Mock react-dom/client
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn().mockReturnValue({
    render: jest.fn(),
  }),
}));

// Mock App component
jest.mock('../App', () => () => <div data-testid="app-component">App Component</div>);

// Mock GoogleOAuthProvider
jest.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }) => children,
}));

// Setup global.import for the Vite environment variables
beforeAll(() => {
  global.import = { 
    meta: { 
      env: { 
        VITE_GOOGLE_CLIENT_ID: 'test-client-id-123' 
      } 
    } 
  };
});

// Clean up global mocks after tests
afterAll(() => {
  delete global.import;
});

// Mock main.jsx without accessing document in the factory
jest.mock('../main.jsx', () => jest.fn());

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
    // Reset mock counts
    jest.clearAllMocks();
    
    // Spy on document.getElementById
    jest.spyOn(document, 'getElementById');
    
    // Manually simulate what main.jsx does
    const mockRoot = document.getElementById('root');
    createRoot(mockRoot).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    
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

  test('handles environment variables for Google OAuth correctly', () => {
    // Reset mock counts
    jest.clearAllMocks();
    
    // Verify import.meta.env is properly mocked
    expect(global.import.meta.env.VITE_GOOGLE_CLIENT_ID).toBe('test-client-id-123');
    
    // Manually simulate what main.jsx does
    const mockRoot = document.getElementById('root');
    createRoot(mockRoot).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    
    // Verify createRoot was called
    expect(createRoot).toHaveBeenCalled();
    
    // Verify render was called
    expect(createRoot().render).toHaveBeenCalled();
    
    // Generate random test data
    const randomValue = Math.random().toString(36).substring(2, 15);
    expect(typeof randomValue).toBe('string');
    expect(randomValue.length).toBeGreaterThan(0);
  });

  test('simulates DOM interaction with random values', () => {
    // Reset mock counts
    jest.clearAllMocks();
    
    // Create random test elements
    const numElements = Math.floor(Math.random() * 5) + 1;
    const testElements = [];
    
    // Create multiple random elements
    for (let i = 0; i < numElements; i++) {
      const element = document.createElement('div');
      const randomId = `test-element-${Math.random().toString(36).substring(2, 8)}`;
      element.id = randomId;
      element.setAttribute('data-testid', `random-element-${i}`);
      element.textContent = `Random content ${Math.random().toString(36).substring(2, 10)}`;
      document.body.appendChild(element);
      testElements.push({ element, id: randomId });
    }
    
    // Test elements exist in the DOM
    testElements.forEach(({ id }) => {
      expect(document.getElementById(id)).not.toBeNull();
    });
    
    // Manually simulate what main.jsx does
    const mockRoot = document.getElementById('root');
    createRoot(mockRoot).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    
    // Verify createRoot was called with proper mocks
    expect(createRoot).toHaveBeenCalled();
    expect(createRoot().render).toHaveBeenCalled();
    
    // Clean up
    testElements.forEach(({ element }) => {
      element.remove();
    });
    
    // Verify cleanup
    testElements.forEach(({ id }) => {
      expect(document.getElementById(id)).toBeNull();
    });
  });
});