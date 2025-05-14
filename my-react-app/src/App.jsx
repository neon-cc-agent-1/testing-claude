import { useState, useEffect } from 'react'
import { googleLogout } from '@react-oauth/google'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './components/Login'

function App() {
  const [count, setCount] = useState(0)
  const [backgroundImage, setBackgroundImage] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // Using underscore prefix for unused variable to satisfy linter
  const [_user, setUser] = useState(null)

  useEffect(() => {
    // Get a random image URL
    const imageUrl = 'https://randomimages.org/api/random?width=1920&height=1080'
    setBackgroundImage(imageUrl)
    
    // Check if user is already logged in from localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
        setIsLoggedIn(true)
      } catch (err) {
        console.error('Error parsing saved user:', err)
        localStorage.removeItem('user')
      }
    }
  }, [])

  const handleLogin = (response) => {
    // In a real app, you would process the credential response here
    // and extract user information after verification
    const userData = { 
      id: response.clientId,
      credential: response.credential,
      loginTime: new Date().toISOString()
    }
    
    // Save user data to localStorage
    localStorage.setItem('user', JSON.stringify(userData))
    
    setUser(userData)
    setIsLoggedIn(true)
  }
  
  const handleLogout = () => {
    // Log out from Google
    googleLogout()
    
    // Clear local state
    setIsLoggedIn(false)
    setUser(null)
    
    // Remove from localStorage
    localStorage.removeItem('user')
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <>
      <div className="hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="user-welcome">
          <p>Welcome back, Google user!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the React logo to learn more
        </p>
      </div>
    </>
  )
}

export default App
