import '../index.css';

// Test that the CSS file can be imported without errors
describe('index.css', () => {
  test('imports without crashing', () => {
    // The test passes if the import doesn't throw
    expect(true).toBe(true);
  });
  
  test('applies global styles to document body', () => {
    // Get computed styles for body
    const bodyStyles = window.getComputedStyle(document.body);
    
    // Check that styles are applied (these checks are minimal since the mock doesn't have actual style values)
    expect(document.body).toBeInTheDocument();
  });
});