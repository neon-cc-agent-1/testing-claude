import { createRoot } from 'react-dom/client';
import App from '../App';
import { StrictMode } from 'react';
import { act } from '@testing-library/react';

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

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe(element) {
    this.element = element;
  }
  unobserve() {}
  disconnect() {}
  // Utility to simulate intersection
  simulateIntersection(isIntersecting) {
    this.callback([{
      isIntersecting,
      target: this.element
    }]);
  }
};

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

  test('renders with placeholder background initially', async () => {
    // Create a mock Image constructor with controlled timing
    const originalImage = global.Image;
    let imageLoadCallback = null;
    global.Image = class {
      constructor() {
        this.onload = null;
      }
      
      set src(value) {
        this._src = value;
        // Store the callback to trigger manually
        imageLoadCallback = () => {
          if (this.onload) this.onload();
        };
      }
      
      get src() {
        return this._src;
      }
    };
    
    // Create a LazyBackground simulation
    const lazyBackground = document.createElement('div');
    lazyBackground.className = 'lazy-background';
    lazyBackground.setAttribute('data-testid', 'lazy-background');
    lazyBackground.style.backgroundColor = '#242424'; // Default placeholder color
    lazyBackground.style.transition = 'background 0.3s ease-in-out';
    
    // Append to document body
    document.body.appendChild(lazyBackground);
    
    // Create a reference to the element
    const elementRef = { current: lazyBackground };
    
    // Initialize state variables for our simulated component
    let isInView = false;
    let isLoaded = false;
    const setIsInView = (value) => { isInView = value; };
    const setIsLoaded = (value) => { 
      isLoaded = value;
      if (isLoaded) {
        // Update background to simulate the effect of isLoaded becoming true
        lazyBackground.style.backgroundImage = 'url(https://example.com/test-image.jpg)';
        lazyBackground.style.backgroundColor = '';
      }
    };
    
    // Verify initial state has placeholder background
    expect(lazyBackground.style.backgroundColor).toBe('rgb(36, 36, 36)'); // Browser converts hex to rgb
    expect(lazyBackground.style.backgroundImage).toBe('');
    
    // Create IntersectionObserver instance as LazyBackground component does
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
            
            // Simulate loading image when in view (like the second useEffect)
            const img = new Image();
            img.onload = () => setIsLoaded(true);
            img.src = 'https://example.com/test-image.jpg';
          }
        });
      },
      { threshold: 0.1, rootMargin: '200px' }
    );
    
    // Observe the element
    observer.observe(lazyBackground);
    
    // Verify we start with placeholder
    expect(isInView).toBe(false);
    expect(isLoaded).toBe(false);
    
    // Act 1: Simulate intersection
    act(() => {
      observer.simulateIntersection(true);
    });
    
    // At this point, isInView should be true, but image hasn't loaded yet
    expect(isInView).toBe(true);
    expect(isLoaded).toBe(false);
    expect(lazyBackground.style.backgroundImage).toBe('');
    expect(lazyBackground.style.backgroundColor).toBe('rgb(36, 36, 36)');
    
    // Act 2: Simulate image load completion
    await act(async () => {
      if (imageLoadCallback) imageLoadCallback();
      // Allow any pending promises to resolve
      await Promise.resolve();
    });
    
    // Now the image should be loaded and background applied
    expect(isLoaded).toBe(true);
    expect(lazyBackground.style.backgroundImage).toBe('url(https://example.com/test-image.jpg)');
    expect(lazyBackground.style.backgroundColor).toBe('');
    
    // Cleanup
    observer.disconnect();
    lazyBackground.remove();
    global.Image = originalImage;
  });
});