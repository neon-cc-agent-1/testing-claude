import { useState, memo, useCallback, useMemo } from 'react'
import '../styles/Navbar.css'

// Memoized navbar item to prevent unnecessary re-renders
const NavItem = memo(({ label, isActive, onClick }) => (
  <li className={isActive ? 'active' : ''} onClick={onClick}>
    {label}
  </li>
))

function Navbar({ activePage, onChangePage, isLoggedIn, onLogout }) {
  const [isOpen, setIsOpen] = useState(false)
  
  const toggleMenu = useCallback(() => {
    setIsOpen(prevState => !prevState)
  }, [])

  const handlePageChange = useCallback((page) => {
    onChangePage(page)
    setIsOpen(false)
  }, [onChangePage])
  
  // Pre-bind page change handlers to avoid inline function creation
  const pageHandlers = useMemo(() => {
    return {
      home: () => handlePageChange('home'),
      faq: () => handlePageChange('faq'),
      gallery: () => handlePageChange('gallery'),
      work: () => handlePageChange('work'),
      login: () => handlePageChange('login')
    }
  }, [handlePageChange])

  // Determine nav classes once to avoid string concatenation in render
  const navLinksClass = useMemo(() => 
    `navbar-links ${isOpen ? 'open' : ''}`, 
    [isOpen]
  )
  
  const menuIconClass = useMemo(() => 
    `menu-icon ${isOpen ? 'open' : ''}`, 
    [isOpen]
  )

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span>React Demo</span>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className={menuIconClass}></span>
        </button>
      </div>
      
      <ul className={navLinksClass}>
        <NavItem 
          label="Home"
          isActive={activePage === 'home'}
          onClick={pageHandlers.home}
        />
        <NavItem 
          label="FAQ"
          isActive={activePage === 'faq'}
          onClick={pageHandlers.faq}
        />
        <NavItem 
          label="Gallery"
          isActive={activePage === 'gallery'}
          onClick={pageHandlers.gallery}
        />
        <NavItem 
          label="Work"
          isActive={activePage === 'work'}
          onClick={pageHandlers.work}
        />
        {isLoggedIn ? (
          <li className="logout-btn" onClick={onLogout}>
            Logout
          </li>
        ) : (
          <NavItem 
            label="Login"
            isActive={activePage === 'login'}
            onClick={pageHandlers.login}
          />
        )}
      </ul>
    </nav>
  )
}

export default memo(Navbar)