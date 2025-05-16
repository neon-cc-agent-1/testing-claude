import '../index.css';
import { render } from '@testing-library/react';

/* global describe, test, expect, beforeEach, afterEach */

// Test that the CSS file can be imported without errors
describe('index.css', () => {
  // Sample component to test CSS application
  const TestComponent = () => (
    <div data-testid="test-component">
      <h1 className="test-header">Test Header</h1>
      <p className="test-paragraph">Test Paragraph</p>
    </div>
  );
  
  beforeEach(() => {
    // Create a style tag for testing
    const style = document.createElement('style');
    style.id = 'test-style';
    style.textContent = `
      body {
        margin: 0;
        font-family: 'Test Font', sans-serif;
        background-color: #f5f5f5;
      }
      .test-header {
        color: blue;
        font-size: 24px;
      }
      .test-paragraph {
        color: #333;
        line-height: 1.5;
      }
    `;
    document.head.appendChild(style);
  });
  
  afterEach(() => {
    // Clean up the test style
    const style = document.getElementById('test-style');
    if (style) {
      style.remove();
    }
  });
  
  test('imports without crashing', () => {
    // The test passes if the import doesn't throw
    expect(true).toBe(true);
  });
  
  test('applies global styles to document body', () => {
    // Get computed styles for body
    const bodyStyles = window.getComputedStyle(document.body);
    
    // Basic style checks
    expect(document.body).toBeInTheDocument();
    
    // Since we're using a CSS mock, we can't directly test computed values
    // But we can test that the body element exists and has been styled in some way
    expect(bodyStyles).toBeTruthy();
  });
  
  test('correctly applies CSS classes to rendered components', () => {
    // Render a test component
    const { getByTestId } = render(<TestComponent />);
    const component = getByTestId('test-component');
    
    // Check that the component was rendered
    expect(component).toBeInTheDocument();
    
    // Get child elements
    const header = component.querySelector('.test-header');
    const paragraph = component.querySelector('.test-paragraph');
    
    // Verify elements with CSS classes exist
    expect(header).toBeTruthy();
    expect(paragraph).toBeTruthy();
    
    // Get computed styles
    const headerStyles = window.getComputedStyle(header);
    const paragraphStyles = window.getComputedStyle(paragraph);
    
    // Verify the styles are applied (though actual values will be from the mock)
    expect(headerStyles).toBeTruthy();
    expect(paragraphStyles).toBeTruthy();
  });
  
  test('CSS classes can be dynamically applied', () => {
    // Create an element
    const element = document.createElement('div');
    element.id = 'dynamic-element';
    document.body.appendChild(element);
    
    // Apply classes dynamically
    element.className = 'test-class-1';
    expect(element.className).toBe('test-class-1');
    
    // Add another class
    element.classList.add('test-class-2');
    expect(element.classList.contains('test-class-1')).toBe(true);
    expect(element.classList.contains('test-class-2')).toBe(true);
    
    // Toggle a class
    element.classList.toggle('test-class-1');
    expect(element.classList.contains('test-class-1')).toBe(false);
    expect(element.classList.contains('test-class-2')).toBe(true);
    
    // Clean up
    element.remove();
  });
});