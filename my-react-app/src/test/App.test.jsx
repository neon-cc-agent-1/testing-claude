import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'
import { googleLogout } from '@react-oauth/google'

/**
 * App Component Test Suite
 * 
 * This suite tests the App component functionality including:
 * - Initial rendering behavior
 * - Login/logout functionality
 * - Navigation between pages
 * - Counter functionality
 * - localStorage interaction
 */

// Mock the @react-oauth/google module
vi.mock('@react-oauth/google', () => ({
  googleLogout: vi.fn(),
  GoogleLogin: ({ onSuccess }) => (
    <button onClick={() => onSuccess({ clientId: '123', credential: 'abc' })}>
      Sign in
    </button>
  )
}))

// Mock fetch/randomimages API
// eslint-disable-next-line no-undef
global.fetch = vi.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve({ url: 'mock-image-url.jpg' }),
  })
);

// Mock localStorage
const localStorageMock = (() => {
  let store = {}
  return {
    getItem: vi.fn(key => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString()
    }),
    removeItem: vi.fn(key => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    })
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.clear()
    render(<App />)
  })

  it('renders Login component when not logged in', () => {
    expect(screen.getByText(/sign in/i)).toBeInTheDocument()
  })

  it('checks localStorage for existing user on mount', () => {
    expect(localStorageMock.getItem).toHaveBeenCalledWith('user')
  })

  it('shows Home component when logged in', () => {
    // Login first
    const signInButton = screen.getByText(/sign in/i)
    fireEvent.click(signInButton)
    
    // Look for React heading in the Home component
    expect(screen.getByText('React')).toBeInTheDocument()
    // Look for the counter in Home
    expect(screen.getByText(/count is/i)).toBeInTheDocument()
  })

  it('handles login successfully', () => {
    // Click the sign in button (our mock GoogleLogin component)
    const signInButton = screen.getByText(/sign in/i)
    fireEvent.click(signInButton)
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('user', expect.any(String))
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('handles logout correctly', () => {
    // Login first
    const signInButton = screen.getByText(/sign in/i)
    fireEvent.click(signInButton)
    
    // Find and click logout button
    const logoutButton = screen.getByText(/logout/i)
    fireEvent.click(logoutButton)
    
    // Check if googleLogout was called
    expect(vi.mocked(googleLogout)).toHaveBeenCalled()
    
    // Check if user data was removed from localStorage
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user')
    
    // Check if we're back to the login page
    expect(screen.getByText(/sign in/i)).toBeInTheDocument()
  })
  
  it('switches between Home and FAQ pages when logged in', () => {
    // Login first
    const signInButton = screen.getByText(/sign in/i)
    fireEvent.click(signInButton)
    
    // Initially on Home page
    expect(screen.getByText('React')).toBeInTheDocument()
    
    // Find and click FAQ nav link
    const faqLink = screen.getByText(/faq/i)
    fireEvent.click(faqLink)
    
    // Should now show FAQ content
    expect(screen.getByText(/frequently asked questions/i)).toBeInTheDocument()
  })

  it('verifies counter functionality in Home component', () => {
    // Login first
    const signInButton = screen.getByText(/sign in/i)
    fireEvent.click(signInButton)
    
    // Verify counter functionality
    const countButton = screen.getByRole('button', { name: /count is/i })
    const initialCount = 0
    expect(countButton).toHaveTextContent(`count is ${initialCount}`)
    
    // Increment counter
    fireEvent.click(countButton)
    expect(countButton).toHaveTextContent(`count is ${initialCount + 1}`)
    
    // Increment counter again
    fireEvent.click(countButton)
    expect(countButton).toHaveTextContent(`count is ${initialCount + 2}`)
  })

  it('handles corrupted user data in localStorage', () => {
    // Unmount previous components
    vi.clearAllMocks()
    localStorageMock.clear()
    
    // Verify localStorage interaction
    const testRender = render(<App />)
    
    // Cleanup from previous test
    testRender.unmount()
    
    // Now test the corrupted data path
    localStorageMock.getItem.mockReturnValueOnce('{invalid-json}')
    render(<App />)
    
    // Should call removeItem when encountering invalid JSON
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user')
  })
})