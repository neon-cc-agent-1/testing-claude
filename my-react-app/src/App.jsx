import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [gradientBackground, setGradientBackground] = useState('')

  const generateRandomColor = () => {
    return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
  }

  const changeBackground = () => {
    // Generate random gradient colors
    const color1 = generateRandomColor();
    const color2 = generateRandomColor();
    const color3 = generateRandomColor();
    
    // Create random gradient angle
    const angle = Math.floor(Math.random() * 360);
    
    // Set gradient background
    setGradientBackground(`linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3})`)
  }

  useEffect(() => {
    // Initialize background on component mount
    changeBackground();
  }, [])

  return (
    <>
      <div className="hero" style={{ background: gradientBackground }}>
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
          <button onClick={changeBackground} style={{ marginTop: '10px' }}>
            Change Background
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
