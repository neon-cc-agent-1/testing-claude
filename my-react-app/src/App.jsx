import { useState, useEffect, Suspense, lazy, useCallback, useMemo } from 'react'
import { googleLogout } from '@react-oauth/google'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'

// Lazy load components with prefetch when supported
const FAQ = lazy(() => import('./components/FAQ'))
const Login = lazy(() => import('./components/Login'))
const Gallery = lazy(() => import('./components/Gallery'))
const Work = lazy(() => import('./components/Work'))

// Custom hook for auth management
function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  
  // Load user from session storage on mount
  useEffect(() => {
    const savedUser = sessionStorage.getItem('user')
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
        setIsLoggedIn(true)
      } catch (err) {
        console.error('Error parsing saved user:', err)
        sessionStorage.removeItem('user')
      }
    }
  }, [])
  
  // Login handler
  const handleLogin = useCallback((response) => {
    const userData = { 
      id: response.clientId,
      credential: response.credential,
      loginTime: new Date().toISOString()
    }
    
    sessionStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    setIsLoggedIn(true)
  }, [])
  
  // Logout handler
  const handleLogout = useCallback((setActivePage) => {
    googleLogout()
    setIsLoggedIn(false)
    setUser(null)
    sessionStorage.removeItem('user')
    setActivePage('login')
  }, [])
  
  return { isLoggedIn, user, handleLogin, handleLogout }
}

// Custom hook for background image management
function useBackgroundImage(activePage, isLoggedIn) {
  const [backgroundImage, setBackgroundImage] = useState(null)
  
  useEffect(() => {
    if (activePage === 'home' && isLoggedIn && !backgroundImage) {
      const imageUrl = 'https://picsum.photos/1920/1080'
      setBackgroundImage(imageUrl)
    }
  }, [activePage, isLoggedIn, backgroundImage])
  
  return backgroundImage
}

// Prefetch a component when needed
function prefetchComponent(component) {
  if (typeof component === 'function') {
    component()
  }
}

function App() {
  const [count, setCount] = useState(0)
  const [activePage, setActivePage] = useState('home')
  const { isLoggedIn, user, handleLogin, handleLogout } = useAuth()
  const backgroundImage = useBackgroundImage(activePage, isLoggedIn)

  // Prefetch other components when idle
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const handle = requestIdleCallback(() => {
        prefetchComponent(FAQ)
        prefetchComponent(Gallery)
      })
      return () => cancelIdleCallback(handle)
    }
  }, [])
  
  // Handle app-wide logout with the proper setActivePage reference
  const handleAppLogout = useCallback(() => {
    handleLogout(setActivePage)
  }, [handleLogout, setActivePage])

  // Memoize the active component to prevent unnecessary re-renders
  const activeComponent = useMemo(() => {
    if (isLoggedIn) {
      switch (activePage) {
        case 'home':
          return (
            <Home 
              count={count} 
              setCount={setCount}
              backgroundImage={backgroundImage}
              userName={user ? 'Google User' : 'User'}
            />
          )
        case 'faq':
          return <FAQ />
        case 'gallery':
          return <Gallery />
        case 'work':
          return <Work />
        default:
          return <Home 
            count={count} 
            setCount={setCount}
            backgroundImage={backgroundImage}
            userName={user ? 'Google User' : 'User'}
          />
      }
    } else {
      // Not logged in
      return activePage === 'gallery' ? 
        <Gallery /> : 
        <Login onLogin={handleLogin} />
    }
  }, [activePage, isLoggedIn, count, setCount, backgroundImage, user, handleLogin])

  return (
    <div className="app-container">
      <Navbar 
        activePage={activePage} 
        onChangePage={setActivePage} 
        isLoggedIn={isLoggedIn} 
        onLogout={handleAppLogout}
      />
      
      <Suspense fallback={<div>Loading...</div>}>
        {activeComponent}
      </Suspense>
    </div>
  )
}

export default App
