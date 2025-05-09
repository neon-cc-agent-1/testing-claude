import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// Mock the react logo import
vi.mock('./assets/react.svg', () => ({
  default: 'mocked-react-logo.svg'
}))

describe('App', () => {
  // Setup userEvent before each test
  const user = userEvent.setup()
  
  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks()
  })

  it('renders the complete page correctly', () => {
    render(<App />)
    
    // Check for the React logo
    const logoElement = screen.getByAltText('React logo')
    expect(logoElement).toBeInTheDocument()
    expect(logoElement).toHaveAttribute('src', 'mocked-react-logo.svg')
    expect(logoElement).toHaveClass('logo')
    expect(logoElement).toHaveClass('react')
    
    // Check for the heading
    expect(screen.getByRole('heading', { level: 1, name: /React/i })).toBeInTheDocument()
    
    // Check for the counter button
    expect(screen.getByRole('button', { name: /count is 0/i })).toBeInTheDocument()
    
    // Check for the instruction text
    expect(screen.getByText(/Edit/i)).toBeInTheDocument()
    expect(screen.getByText(/src\/App.jsx/i)).toBeInTheDocument()
    
    // Check for the "read the docs" text
    expect(screen.getByText(/Click on the React logo to learn more/i)).toBeInTheDocument()
    
    // Check if the hero div exists with a background image
    const h1Element = screen.getByRole('heading', { level: 1, name: /React/i })
    const heroDiv = h1Element.closest('.hero')
    expect(heroDiv).toBeInTheDocument()
    expect(heroDiv).toHaveAttribute('style')
  })

  it('increments counter when button is clicked', async () => {
    render(<App />)
    
    // Get the counter button
    const counterButton = screen.getByRole('button', { name: /count is 0/i })
    
    // Click the button
    await user.click(counterButton)
    
    // Check if the counter was incremented
    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()
    
    // Click again and check if it increments to 2
    await user.click(counterButton)
    expect(screen.getByRole('button', { name: /count is 2/i })).toBeInTheDocument()
  })

  it('sets a background image on the hero div', () => {
    render(<App />)
    
    // Find the hero div
    const h1Element = screen.getByRole('heading', { level: 1, name: /React/i })
    const heroDiv = h1Element.closest('.hero')
    
    // Check if the hero div has a style attribute
    expect(heroDiv).toHaveAttribute('style')
    
    // Check if the style contains a background image URL
    const style = heroDiv.getAttribute('style')
    expect(style).toContain('background-image')
    expect(style).toContain('url')
    expect(style).toContain('randomimages.org')
  })

  it('includes a link to React documentation', () => {
    render(<App />)
    
    // Find the React logo link
    const reactLink = screen.getByRole('link')
    
    // Check if the link points to the React documentation
    expect(reactLink).toHaveAttribute('href', 'https://react.dev')
    expect(reactLink).toHaveAttribute('target', '_blank')
  })
})