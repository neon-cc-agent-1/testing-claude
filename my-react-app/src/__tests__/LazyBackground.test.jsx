import { render, screen, act } from '@testing-library/react';
import LazyBackground from '../components/LazyBackground';

/* global jest, describe, beforeEach, afterEach, test, expect */

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.elements = new Set();
  }

  observe(element) {
    this.elements.add(element);
  }

  unobserve(element) {
    this.elements.delete(element);
  }

  disconnect() {
    this.elements.clear();
  }

  // Simulate an element entering the viewport
  simulateIntersection(isIntersecting) {
    const entries = [...this.elements].map(target => ({
      isIntersecting,
      target,
      boundingClientRect: target.getBoundingClientRect(),
      intersectionRatio: isIntersecting ? 0.5 : 0,
      intersectionRect: isIntersecting ? target.getBoundingClientRect() : { x: 0, y: 0, width: 0, height: 0 },
      rootBounds: null,
      time: Date.now()
    }));
    
    this.callback(entries);
  }
}

describe('LazyBackground Component', () => {
  let originalIntersectionObserver;
  let mockIntersectionObserver;
  
  beforeEach(() => {
    // Save original IntersectionObserver
    originalIntersectionObserver = window.IntersectionObserver;
    
    // Create mock IntersectionObserver instance
    mockIntersectionObserver = new MockIntersectionObserver(() => {}, {});
    
    // Replace window IntersectionObserver with mock
    window.IntersectionObserver = jest.fn().mockImplementation(
      (callback, options) => {
        mockIntersectionObserver = new MockIntersectionObserver(callback, options);
        return mockIntersectionObserver;
      }
    );

    // Mock Image constructor
    window.Image = class {
      constructor() {
        this.onload = null;
        this.src = '';
        
        // Auto trigger onload after setting src with some delay
        Object.defineProperty(this, 'src', {
          set(value) {
            this._src = value;
            setTimeout(() => {
              if (this.onload) this.onload();
            }, 10);
          },
          get() {
            return this._src;
          }
        });
      }
    };
  });
  
  afterEach(() => {
    // Restore original IntersectionObserver
    window.IntersectionObserver = originalIntersectionObserver;
  });
  
  test('renders with placeholder background initially', () => {
    render(
      <LazyBackground 
        src="/test-image.jpg" 
        placeholder="#e0e0e0"
        data-testid="bg-element"
      >
        <div>Child content</div>
      </LazyBackground>
    );
    
    const backgroundElement = screen.getByText('Child content').parentElement;
    
    // Check initial styling with placeholder
    expect(backgroundElement.style.backgroundColor).toBe('rgb(224, 224, 224)');
    expect(backgroundElement.style.backgroundImage).toBeFalsy();
    
    // Should have Child content
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
  
  test('loads image when element enters viewport', async () => {
    // Render component
    render(
      <LazyBackground 
        src="/test-image.jpg"
        data-testid="bg-element"
      >
        <div>Child content</div>
      </LazyBackground>
    );
    
    const backgroundElement = screen.getByText('Child content').parentElement;
    
    // Initial state (before intersection)
    expect(backgroundElement.style.backgroundImage).toBeFalsy();
    expect(backgroundElement.style.backgroundColor).toBe('rgb(36, 36, 36)'); // Default placeholder
    
    // Simulate intersection (element enters viewport)
    act(() => {
      mockIntersectionObserver.simulateIntersection(true);
    });
    
    // Wait for image load to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
    });
    
    // After image load, background image should be set
    expect(backgroundElement.style.backgroundImage).toBe('url(/test-image.jpg)');
  });
  
  test('applies custom className and styles', () => {
    const customStyle = { 
      borderRadius: '8px',
      minHeight: '200px'
    };
    
    render(
      <LazyBackground 
        src="/test-image.jpg"
        className="custom-background"
        style={customStyle}
      >
        <div>Child content</div>
      </LazyBackground>
    );
    
    const backgroundElement = screen.getByText('Child content').parentElement;
    
    // Check if custom class is applied
    expect(backgroundElement).toHaveClass('custom-background');
    
    // Check if custom styles are applied
    expect(backgroundElement.style.borderRadius).toBe('8px');
    expect(backgroundElement.style.minHeight).toBe('200px');
  });
  
  test('unobserves when component unmounts', () => {
    // Create spy on mockIntersectionObserver.unobserve
    const unobserveSpy = jest.spyOn(MockIntersectionObserver.prototype, 'unobserve');
    
    const { unmount } = render(
      <LazyBackground src="/test-image.jpg">
        <div>Child content</div>
      </LazyBackground>
    );
    
    // Unmount the component
    unmount();
    
    // Check if unobserve was called
    expect(unobserveSpy).toHaveBeenCalled();
    
    // Clean up spy
    unobserveSpy.mockRestore();
  });
  
  test('handles case when src is not provided', async () => {
    render(
      <LazyBackground placeholder="#ff0000">
        <div>Child content</div>
      </LazyBackground>
    );
    
    const backgroundElement = screen.getByText('Child content').parentElement;
    
    // Should have placeholder color
    expect(backgroundElement.style.backgroundColor).toBe('rgb(255, 0, 0)');
    
    // Simulate intersection
    act(() => {
      mockIntersectionObserver.simulateIntersection(true);
    });
    
    // Wait for potential image load (should not happen)
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
    });
    
    // Should still have placeholder, not background image
    expect(backgroundElement.style.backgroundImage).toBeFalsy();
    expect(backgroundElement.style.backgroundColor).toBe('rgb(255, 0, 0)');
  });

  test('transitions smoothly between placeholder and actual background image', async () => {
    // Render with custom placeholder
    render(
      <LazyBackground 
        src="/test-image.jpg"
        placeholder="#aabbcc"
      >
        <div>Preview content</div>
      </LazyBackground>
    );
    
    const backgroundElement = screen.getByText('Preview content').parentElement;
    
    // Initial state should show placeholder
    expect(backgroundElement.style.backgroundColor).toBe('rgb(170, 187, 204)'); // #aabbcc
    expect(backgroundElement.style.transition).toBe('background 0.3s ease-in-out');
    
    // Simulate element entering viewport
    act(() => {
      mockIntersectionObserver.simulateIntersection(true);
    });
    
    // Check initial state before image loads (should still be placeholder)
    expect(backgroundElement.style.backgroundColor).toBe('rgb(170, 187, 204)');
    
    // Wait for image load process
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
    });
    
    // After image load, should have transitioned to image background
    expect(backgroundElement.style.backgroundImage).toBe('url(/test-image.jpg)');
    
    // Transition property should remain for smooth visual effect
    expect(backgroundElement.style.transition).toBe('background 0.3s ease-in-out');
  });
});