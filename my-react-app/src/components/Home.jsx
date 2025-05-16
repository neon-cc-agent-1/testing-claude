import reactLogo from '../assets/react.svg'
import '../App.css'
import LazyImage from './LazyImage'
import LazyBackground from './LazyBackground'

function Home({ count, setCount, backgroundImage }) {
  return (
    <LazyBackground 
      src={backgroundImage} 
      className="hero"
      // You could add a placeholder like this:
      // placeholderSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"
    >
      <div>
        <a href="https://react.dev" target="_blank">
          <LazyImage
            src={reactLogo}
            className="logo react"
            alt="React logo"
            placeholderSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3C/svg%3E"
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