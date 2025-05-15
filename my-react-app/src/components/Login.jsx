import { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import '../styles/Login.css'

function Login({ onLogin, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState({})
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Form login handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const fieldValue = type === 'checkbox' ? checked : value
    
    setFormData({
      ...formData,
      [name]: fieldValue
    })
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsLoading(true)
      
      // Handle login logic here
      console.log('Login form submitted:', formData)
      
      // Simulate successful login
      setTimeout(() => {
        setIsLoading(false)
        if (onLoginSuccess) {
          onLoginSuccess()
        }
      }, 500)
    }
  }

  // Google login handlers
  const handleGoogleSuccess = (credentialResponse) => {
    setIsLoading(true)
    try {
      // In a real app, you would verify the token on your backend
      console.log('Google login successful:', credentialResponse)
      
      // Pass the response to the parent component
      if (onLogin) onLogin(credentialResponse)
      
      setError('')
    } catch (err) {
      console.error('Login error:', err)
      setError('Authentication failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleError = () => {
    setIsLoading(false)
    setError('Google login failed. Please try again.')
  }

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2>Login to Your Account</h2>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          
          <button type="submit" className="login-button">Login</button>
        </form>
        
        <div className="form-divider">
          <span>OR</span>
        </div>
        
        <div className="google-signin-wrapper">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            theme="filled_blue"
            text="signin_with"
            shape="rectangular"
            logo_alignment="center"
            width="280"
          />
        </div>
        
        {isLoading && <p className="loading-message">Logging in...</p>}
        {error && <p className="error-message">{error}</p>}
        
        <div className="form-footer">
          <a href="#forgot-password">Forgot password?</a>
          <p>Don't have an account? <a href="#signup">Sign up</a></p>
        </div>
      </div>
    </div>
  )
}

export default Login
