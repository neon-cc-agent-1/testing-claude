import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import App from './App'

// Mock the App.css import to avoid any potential styling issues
vi.mock('./App.css', () => {
  return {}
})

// Mock the background image setting
vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...actual,
    // Replace useEffect with a no-op version for tests
    useEffect: () => {},
  }
})

describe('App Component', () => {
  it('button click correctly increments the counter', async () => {
    // Render the component
    const { getByRole } = render(<App />)
    
    // Find the button element
    const button = getByRole('button')
    
    // Initial count should be 0
    expect(button.textContent).toContain('count is 0')
    
    // Click the button to increment the counter
    fireEvent.click(button)
    
    // Count should be incremented to 1
    expect(button.textContent).toContain('count is 1')
  })
  
  it('renders the React logo with correct link', () => {
    const { getByAltText } = render(<App />)
    
    // Find the logo by its alt text
    const logo = getByAltText('React logo')
    
    // Check that the logo exists
    expect(logo).toBeDefined()
    
    // Check that the logo is inside a link to react.dev
    expect(logo.closest('a')).toHaveAttribute('href', 'https://react.dev')
  })
})