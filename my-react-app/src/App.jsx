import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [backgroundImage, setBackgroundImage] = useState('')

  useEffect(() => {
    // Get a random image URL
    const imageUrl = 'https://randomimages.org/api/random?width=1920&height=1080'
    setBackgroundImage(imageUrl)
  }, [])

  return (
    <>
      <div className="hero" style={{ backgroundColor: 'magenta', backgroundImage: 'none' }}>
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
    </>
  )
}

export default App
