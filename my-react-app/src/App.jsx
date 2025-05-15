import { useState, useEffect } from 'react'
import { googleLogout } from '@react-oauth/google'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import FAQ from './components/FAQ'
import Login from './components/Login'

function App() {
  const [count, setCount] = useState(0)
  const [backgroundImage, setBackgroundImage] = useState('')
  const [activePage, setActivePage] = useState('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

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
    // Process the credential response
    const userData = {
      id: response.clientId,
      credential: response.credential,
      profile: response.profile || null,
      loginTime: new Date().toISOString()
    }
    
    // Save user data to localStorage (excluding the credential for security)
    const userDataForStorage = {
      ...userData,
      credential: undefined // Don't store the actual token
    }
    localStorage.setItem('user', JSON.stringify(userDataForStorage))
    
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
    
    // Return to login page
    setActivePage('login')
  }

  return (
    <>
      <Navbar 
        activePage={activePage} 
        onChangePage={setActivePage} 
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout}
      />
      
      {isLoggedIn ? (
        <>
          {activePage === 'home' && (
            <Home 
              count={count} 
              setCount={setCount}
              backgroundImage={backgroundImage}
              userName={user?.profile?.name || 'User'}
            />
          )}
          
          {activePage === 'faq' && <FAQ />}
        </>
      ) : (
        <Login onLogin={handleLogin} onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </>
  )
}

export default App
