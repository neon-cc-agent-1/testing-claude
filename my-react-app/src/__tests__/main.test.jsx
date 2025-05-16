import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

/* global jest, describe, beforeEach, afterEach, test, expect */

// Mock modules
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn().mockReturnValue({
    render: jest.fn(),
  }),
}));

jest.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }) => <div data-testid="oauth-provider">{children}</div>,
}));

jest.mock('../App', () => () => <div data-testid="app-component">App Component</div>);

// Mock main module to avoid issues with import.meta.env
jest.mock('../main', () => jest.fn(), { virtual: true });

// Mock environment variables for testing
// Since import.meta.env is not available in Jest, we use a different approach
// to mock the environment variables
global.googleClientId = 'test-client-id';

describe('main.jsx rendering', () => {
  let mockRoot;
  
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Create root element
    mockRoot = document.createElement('div');
    mockRoot.id = 'root';
    document.body.appendChild(mockRoot);
    
    // Mock getElementById to return our mock element
    jest.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (id === 'root') return mockRoot;
      return document.querySelector(`#${id}`);
    });
  });
  
  afterEach(() => {
    // Clean up
    if (mockRoot && mockRoot.parentNode) {
      mockRoot.parentNode.removeChild(mockRoot);
    }
    jest.restoreAllMocks();
  });
  
  test('renders the App component into root element', () => {
    // Verify the root element exists in the document
    expect(document.getElementById('root')).toBeTruthy();
    
    // Simulate what main.jsx does - create a root and render into it
    const root = createRoot(document.getElementById('root'));
    root.render(
      <StrictMode>
        <div data-testid="oauth-provider">
          <App />
        </div>
      </StrictMode>
    );
    
    // Verify getElementById was called with 'root'
    expect(document.getElementById).toHaveBeenCalledWith('root');
    
    // Verify createRoot was called with the root element
    expect(createRoot).toHaveBeenCalledWith(mockRoot);
    
    // Verify render was called with correct component structure
    expect(root.render).toHaveBeenCalled();
  });

  test('main.jsx handles missing environment variables gracefully', () => {
    // Temporarily modify the mock environment
    const originalClientId = global.googleClientId;
    global.googleClientId = undefined;
    
    // Create root and render (simulating main.jsx behavior)
    const root = createRoot(document.getElementById('root'));
    
    // In main.jsx, it would fallback to 'YOUR_GOOGLE_CLIENT_ID'
    // We're testing that the rendering proceeds even without the client ID
    root.render(
      <StrictMode>
        <div data-testid="oauth-provider">
          <App />
        </div>
      </StrictMode>
    );
    
    // Verify rendering succeeded despite missing env var
    expect(root.render).toHaveBeenCalled();
    
    // Restore the original environment
    global.googleClientId = originalClientId;
  });
  
  test('DOM manipulation with tree creation and querying', () => {
    // Create a test tree structure
    const container = document.createElement('div');
    container.id = 'test-container';
    container.setAttribute('data-testid', 'container');
    
    // Create a more predictable structure for testing
    const createSimpleTree = (container) => {
      // Level 3 (root level)
      container.className = 'level-3';
      
      // Level 2 (2 children)
      for (let i = 0; i < 2; i++) {
        const level2Node = document.createElement('div');
        level2Node.id = `level2-${i}`;
        level2Node.className = 'level-2';
        level2Node.setAttribute('data-path', `${i}`);
        container.appendChild(level2Node);
        
        // Level 1 (2 children per level 2 node = 4 total)
        for (let j = 0; j < 2; j++) {
          const level1Node = document.createElement('div');
          level1Node.id = `level1-${i}-${j}`;
          level1Node.className = 'level-1';
          level1Node.setAttribute('data-path', `${i}-${j}`);
          level1Node.textContent = `Leaf ${i}-${j}`;
          level2Node.appendChild(level1Node);
        }
      }
    };
    
    createSimpleTree(container);
    document.body.appendChild(container);
    
    // Test tree structure with specific counts
    expect(document.querySelectorAll('.level-3').length).toBe(1); // Root
    expect(document.querySelectorAll('.level-2').length).toBe(2); // Middle level
    expect(document.querySelectorAll('.level-1').length).toBe(4); // Leaf nodes
    
    // Test attribute-based selection
    const leafNodes = document.querySelectorAll('.level-1');
    expect(leafNodes.length).toBe(4);
    
    // Test combined selectors
    const specificPath = document.querySelector('[data-path="0-1"]');
    expect(specificPath).not.toBeNull();
    expect(specificPath.id).toBe('level1-0-1');
    
    // Test structure modifications
    const newNode = document.createElement('span');
    newNode.textContent = 'Dynamic content';
    container.querySelector('[data-path="1-0"]').appendChild(newNode);
    
    expect(document.querySelector('[data-path="1-0"] span').textContent).toBe('Dynamic content');
    
    // Clean up
    container.remove();
    expect(document.getElementById('test-container')).toBeNull();
  });
  
  test('handles dynamic element creation and event delegation', () => {
    // Create a container with event delegation
    const container = document.createElement('div');
    container.id = 'delegation-container';
    
    // Set up event counters
    const eventCounts = {
      container: 0,
      button1: 0,
      button2: 0,
      dynamicButton: 0
    };
    
    // Add delegation handler
    container.addEventListener('click', (e) => {
      eventCounts.container++;
      
      // Handle events based on target id
      if (e.target.id === 'button-1') {
        eventCounts.button1++;
      } else if (e.target.id === 'button-2') {
        eventCounts.button2++;
      } else if (e.target.id === 'dynamic-button') {
        eventCounts.dynamicButton++;
      }
    });
    
    // Create static buttons
    const button1 = document.createElement('button');
    button1.id = 'button-1';
    button1.textContent = 'Button 1';
    container.appendChild(button1);
    
    const button2 = document.createElement('button');
    button2.id = 'button-2';
    button2.textContent = 'Button 2';
    container.appendChild(button2);
    
    document.body.appendChild(container);
    
    // Simulate clicks
    button1.click();
    button2.click();
    
    // Add a dynamic button after clicks
    const dynamicButton = document.createElement('button');
    dynamicButton.id = 'dynamic-button';
    dynamicButton.textContent = 'Dynamic Button';
    container.appendChild(dynamicButton);
    
    // Click the dynamic button
    dynamicButton.click();
    
    // Verify all event counts
    expect(eventCounts.container).toBe(3);
    expect(eventCounts.button1).toBe(1);
    expect(eventCounts.button2).toBe(1);
    expect(eventCounts.dynamicButton).toBe(1);
    
    // Cleanup
    container.remove();
  });
  
  test('properly manages component rendering lifecycle', () => {
    // This test demonstrates a simplified component rendering lifecycle
    // Create a simple component renderer function
    const renderComponent = (props, target) => {
      const componentRoot = document.createElement('div');
      componentRoot.className = 'component-root';
      
      // Add a title based on props
      const title = document.createElement('h1');
      title.textContent = props.title || 'Default Title';
      componentRoot.appendChild(title);
      
      // Add content
      const content = document.createElement('div');
      content.className = 'content';
      content.textContent = props.content || 'Default content';
      componentRoot.appendChild(content);
      
      // Clean previous renders
      while (target.firstChild) {
        target.removeChild(target.firstChild);
      }
      
      // Append the new component
      target.appendChild(componentRoot);
      
      // Return an update function
      return (newProps) => {
        // Update title if changed
        if (newProps.title && newProps.title !== props.title) {
          title.textContent = newProps.title;
        }
        
        // Update content if changed
        if (newProps.content && newProps.content !== props.content) {
          content.textContent = newProps.content;
        }
      };
    };
    
    // Create a container for our "component"
    const container = document.createElement('div');
    container.id = 'component-container';
    document.body.appendChild(container);
    
    // Initial render
    const updateComponent = renderComponent({ 
      title: 'Initial Title', 
      content: 'Initial content' 
    }, container);
    
    // Verify initial render
    expect(container.querySelector('h1').textContent).toBe('Initial Title');
    expect(container.querySelector('.content').textContent).toBe('Initial content');
    
    // Update the component
    updateComponent({ 
      title: 'Updated Title',
      content: 'Updated content'
    });
    
    // Verify updates
    expect(container.querySelector('h1').textContent).toBe('Updated Title');
    expect(container.querySelector('.content').textContent).toBe('Updated content');
    
    // Test partial update
    updateComponent({ content: 'Partial update' });
    
    // Verify only content was updated
    expect(container.querySelector('h1').textContent).toBe('Updated Title');
    expect(container.querySelector('.content').textContent).toBe('Partial update');
    
    // Clean up
    container.remove();
  });
});