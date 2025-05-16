import React from 'react'
import reactLogo from '../assets/react.svg'
import '../App.css'
import LazyImage from './LazyImage'
import LazyBackground from './LazyBackground'

function Home({ count, setCount, backgroundImage }) {
  return (
    <LazyBackground 
      src={backgroundImage} 
      className="hero"
      style={{ 
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div>
        <a href="https://react.dev" target="_blank">
          <LazyImage 
            src={reactLogo} 
            className="logo react" 
            alt="React logo" 
            width="100px"
            height="100px"
          />
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
    </LazyBackground>
  )
}

export default Home