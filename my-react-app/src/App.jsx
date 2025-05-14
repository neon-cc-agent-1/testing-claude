import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Contact from './components/Contact'

function App() {
  const [count, setCount] = useState(0)
  const [backgroundImage, setBackgroundImage] = useState('')
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    // Get a random image URL
    const imageUrl = 'https://randomimages.org/api/random?width=1920&height=1080'
    setBackgroundImage(imageUrl)
  }, [])

  return (
    <>
      <nav className="navbar">
        <button onClick={() => setCurrentPage('home')}>Home</button>
        <button onClick={() => setCurrentPage('contact')}>Contact</button>
      </nav>
      
      {currentPage === 'home' && (
        <div className="hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div>
            <a href="https://react.dev" target="_blank">
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
      )}
      
      {currentPage === 'contact' && <Contact />}
    </>
  )
}

export default App
