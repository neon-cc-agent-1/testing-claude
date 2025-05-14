import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  const [count, setCount] = useState(5)
  const navigate = useNavigate()

  // Countdown timer to redirect to home
  useEffect(() => {
    if (count <= 0) {
      navigate('/')
      return
    }
    
    const timer = setTimeout(() => {
      setCount(count - 1)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [count, navigate])

  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>Sorry, the page you are looking for doesn't exist or has been moved.</p>
      <p>You will be redirected to the home page in <span className="countdown">{count}</span> seconds...</p>
      <Link to="/" className="home-button">Take Me Home Now</Link>
    </div>
  )
}

export default NotFound