import reactLogo from '../assets/react.svg'
import '../App.css'

function Home({ count, setCount, backgroundImage, userName, onChangeBackground }) {
  return (
    <div className="hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Welcome, {userName}</h1>
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
      <button className="change-background" onClick={onChangeBackground}>
        Change Background
      </button>
    </div>
  )
}

export default Home