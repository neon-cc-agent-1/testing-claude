import { Suspense } from 'react'
import Navbar from '../components/Navbar'
import ErrorBoundary from '../components/ErrorBoundary'
import './DefaultLayout.css'

function DefaultLayout({ 
  children, 
  activePage, 
  setActivePage, 
  isLoggedIn, 
  handleLogout 
}) {
  return (
    <div className="layout-container">
      <ErrorBoundary showDetails={import.meta.env.DEV}>
        <Navbar 
          activePage={activePage} 
          onChangePage={setActivePage} 
          isLoggedIn={isLoggedIn} 
          onLogout={handleLogout}
        />
        
        <main className="main-content">
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </main>
      </ErrorBoundary>
    </div>
  )
}

export default DefaultLayout