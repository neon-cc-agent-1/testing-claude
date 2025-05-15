import reactLogo from '../assets/react.svg'
import '../App.css'

function Home({ count, setCount, backgroundImage }) {
  return (
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
  )
}

export default Home