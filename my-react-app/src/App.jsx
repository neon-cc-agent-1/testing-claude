import { useState, useEffect } from 'react'
import { googleLogout } from '@react-oauth/google'
import './App.css'
import DefaultLayout from './layouts/DefaultLayout'
import Home from './components/Home'
import FAQ from './components/FAQ'
import Login from './components/Login'
import Gallery from './components/Gallery'
import Work from './components/Work'
import ErrorBoundary from './components/ErrorBoundary'

// We can use React.lazy for code splitting and lazy loading components
// Example: const LazyFAQ = lazy(() => import('./components/FAQ'));

function App() {
  const [count, setCount] = useState(0)
  const [backgroundImage, setBackgroundImage] = useState(null)
  const [activePage, setActivePage] = useState('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Get a random image URL - only if we're on the home page
    if (activePage === 'home' && isLoggedIn && !backgroundImage) {
      // Using picsum.photos which is a safe image service
      const imageUrl = 'https://picsum.photos/1920/1080'
      setBackgroundImage(imageUrl)
    }
    
    // Check if user is already logged in from sessionStorage
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
  }, [activePage, isLoggedIn, backgroundImage])

  const handleLogin = (response) => {
    // In a real app, you would process the credential response here
    // and extract user information after verification
    const userData = { 
      id: response.clientId,
      credential: response.credential,
      loginTime: new Date().toISOString()
    }
    
    // Save user data to sessionStorage
    sessionStorage.setItem('user', JSON.stringify(userData))
    
    setUser(userData)
    setIsLoggedIn(true)
  }
  
  const handleLogout = () => {
    // Log out from Google
    googleLogout()
    
    // Clear local state
    setIsLoggedIn(false)
    setUser(null)
    
    // Remove from sessionStorage
    sessionStorage.removeItem('user')
    
    // Return to login page
    setActivePage('login')
  }

  return (
    <div className="app-container">
      <DefaultLayout
        activePage={activePage}
        setActivePage={setActivePage}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      >
        <ErrorBoundary showDetails={import.meta.env.DEV}>
          {isLoggedIn ? (
            <>
              {activePage === 'home' && (
                <Home 
                  count={count} 
                  setCount={setCount}
                  backgroundImage={backgroundImage}
                  userName={user ? 'Google User' : 'User'}
                />
              )}
              
              {/* Here we could use lazy loading with React.lazy if needed */}
              {activePage === 'faq' && <FAQ />}
              
              {activePage === 'gallery' && <Gallery />}
              
              {activePage === 'work' && <Work />}
            </>
          ) : (
            <>
              {activePage === 'gallery' ? (
                <Gallery />
              ) : (
                <Login onLogin={handleLogin} onLoginSuccess={() => setIsLoggedIn(true)} />
              )}
            </>
          )}
        </ErrorBoundary>
      </DefaultLayout>
    </div>
  )
}

export default App
