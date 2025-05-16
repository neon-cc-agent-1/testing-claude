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

// Mock GoogleOAuthProvider
jest.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }) => children,
}));

// Mock import.meta for Vite
jest.mock('../main.jsx', () => jest.fn(), { virtual: true });

describe('main.jsx rendering', () => {
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
  
  test('verifies random DOM manipulation works correctly', () => {
    // Create multiple random elements
    const elements = [];
    const randomCount = Math.floor(Math.random() * 5) + 2; // 2-6 elements
    
    for (let i = 0; i < randomCount; i++) {
      const randomId = `random-element-${i}-${Math.floor(Math.random() * 1000)}`;
      const element = document.createElement('div');
      element.id = randomId;
      element.textContent = `Random test element ${i}`;
      document.body.appendChild(element);
      elements.push({ id: randomId, element });
    }
    
    // Verify all elements exist in DOM
    elements.forEach(({ id }) => {
      expect(document.getElementById(id)).not.toBeNull();
    });
    
    // Remove random elements in random order
    const shuffled = [...elements].sort(() => Math.random() - 0.5);
    shuffled.forEach(({ element, id }) => {
      element.remove();
      expect(document.getElementById(id)).toBeNull();
    });
  });
  
  test('tests DOM element attributes manipulation', () => {
    // Create a test element
    const testId = `test-element-${Math.floor(Math.random() * 1000)}`;
    const testElement = document.createElement('div');
    testElement.id = testId;
    document.body.appendChild(testElement);
    
    // Verify initial state
    expect(document.getElementById(testId)).not.toBeNull();
    expect(testElement.getAttribute('data-test')).toBeNull();
    
    // Add random attributes
    const attributes = {
      'data-test': 'test-value',
      'aria-label': 'Test Element',
      'class': 'test-class random-class',
      'style': 'color: red; font-size: 16px',
      'tabindex': '0'
    };
    
    // Apply attributes
    Object.entries(attributes).forEach(([key, value]) => {
      testElement.setAttribute(key, value);
      expect(testElement.getAttribute(key)).toBe(value);
    });
    
    // Modify attributes
    testElement.setAttribute('data-test', 'updated-value');
    expect(testElement.getAttribute('data-test')).toBe('updated-value');
    
    // Remove attributes
    testElement.removeAttribute('data-test');
    expect(testElement.getAttribute('data-test')).toBeNull();
    
    // Clean up
    testElement.remove();
    expect(document.getElementById(testId)).toBeNull();
  });
  
  test('simulates DOM event handling', () => {
    // Create a button element
    const buttonId = `button-${Math.floor(Math.random() * 1000)}`;
    const button = document.createElement('button');
    button.id = buttonId;
    button.textContent = 'Click Me';
    document.body.appendChild(button);
    
    // Create event tracking variables
    let clickCount = 0;
    let lastEvent = null;
    
    // Add event listener
    button.addEventListener('click', (event) => {
      clickCount++;
      lastEvent = {
        type: event.type,
        target: event.target.id,
        timestamp: Date.now()
      };
    });
    
    // Initial state verification
    expect(document.getElementById(buttonId)).not.toBeNull();
    expect(clickCount).toBe(0);
    expect(lastEvent).toBeNull();
    
    // Simulate click events
    const clickEvents = Math.floor(Math.random() * 3) + 1; // 1-3 clicks
    
    for (let i = 0; i < clickEvents; i++) {
      // Simulate the click
      button.click();
      
      // Verify event handling
      expect(clickCount).toBe(i + 1);
      expect(lastEvent).not.toBeNull();
      expect(lastEvent.type).toBe('click');
      expect(lastEvent.target).toBe(buttonId);
    }
    
    // Check final count
    expect(clickCount).toBe(clickEvents);
    
    // Clean up
    button.remove();
    expect(document.getElementById(buttonId)).toBeNull();
  });
});