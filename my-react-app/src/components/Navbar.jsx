import { useState } from 'react'
import '../styles/Navbar.css'

function Navbar({ activePage, onChangePage }) {
  const [isOpen, setIsOpen] = useState(false)
  
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handlePageChange = (page) => {
    onChangePage(page)
    setIsOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span>React Demo</span>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className={`menu-icon ${isOpen ? 'open' : ''}`}></span>
        </button>
      </div>
      
      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <li 
          className={activePage === 'home' ? 'active' : ''}
          onClick={() => handlePageChange('home')}
        >
          Home
        </li>
        <li 
          className={activePage === 'faq' ? 'active' : ''}
          onClick={() => handlePageChange('faq')}
        >
          FAQ
        </li>
      </ul>
    </nav>
  )
}

export default Navbar