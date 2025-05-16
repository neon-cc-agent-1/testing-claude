import { useState, useEffect, Suspense } from 'react'
import { googleLogout } from '@react-oauth/google'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import FAQ from './components/FAQ'
import Login from './components/Login'
import Gallery from './components/Gallery'

// We can use React.lazy for code splitting and lazy loading components
// Example: const LazyFAQ = lazy(() => import('./components/FAQ'));

function App() {
  const [count, setCount] = useState(0)
  const [backgroundImage] = useState('https://randomimages.org/api/random?width=1920&height=1080')
  const [activePage, setActivePage] = useState('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
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
    
    // Return to login page
    setActivePage('login')
  }

  return (
    <div className="app-container">
      <Navbar 
        activePage={activePage} 
        onChangePage={setActivePage} 
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout}
      />
      
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  )
}

export default App
