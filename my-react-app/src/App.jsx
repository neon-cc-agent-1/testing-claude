import { useState, useEffect } from 'react'
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

  useEffect(() => {
    // Get a random image URL
    const imageUrl = 'https://randomimages.org/api/random?width=1920&height=1080'
    setBackgroundImage(imageUrl)
  }, [])

  return (
    <>
      <Navbar activePage={activePage} onChangePage={setActivePage} isLoggedIn={isLoggedIn} />
      
      {activePage === 'home' && (
        <Home 
          count={count} 
          setCount={setCount}
          backgroundImage={backgroundImage}
        />
      )}
      
      {activePage === 'faq' && <FAQ />}
      
      {activePage === 'login' && <Login onLoginSuccess={() => setIsLoggedIn(true)} />}
    </>
  )
}

export default App
