import { memo, useCallback, useMemo } from 'react'
import reactLogo from '../assets/react.svg'
import '../App.css'
import LazyImage from './LazyImage'
import LazyBackground from './LazyBackground'

// Memoized button component to prevent unnecessary re-renders
const CountButton = memo(({ count, onClick }) => (
  <button onClick={onClick}>
    count is {count}
  </button>
))

function Home({ count, setCount, backgroundImage }) {
  const incrementCount = useCallback(() => {
    setCount(prevCount => prevCount + 1)
  }, [setCount])

  // Memoize background style to prevent recreation on each render
  const backgroundStyle = useMemo(() => ({ 
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }), [])

  return (
    <LazyBackground 
      src={backgroundImage} 
      className="hero"
      style={backgroundStyle}
    >
      <div>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer" prefetch="intent">
          <LazyImage 
            src={reactLogo} 
            className="logo react" 
            alt="React logo" 
            width="100px"
            height="100px"
            placeholder="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3C/svg%3E"
          />
        </a>
      </div>
      <h1>React</h1>
      <div className="card">
        <CountButton count={count} onClick={incrementCount} />
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

export default memo(Home)