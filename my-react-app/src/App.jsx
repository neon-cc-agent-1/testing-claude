import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import FAQ from './components/FAQ'

function App() {
  const [count, setCount] = useState(0)
  const [backgroundImage, setBackgroundImage] = useState('')
  const [activePage, setActivePage] = useState('home')

  useEffect(() => {
    // Get a random image URL
    const imageUrl = 'https://randomimages.org/api/random?width=1920&height=1080'
    setBackgroundImage(imageUrl)
  }, [])

  return (
    <>
      <Navbar activePage={activePage} onChangePage={setActivePage} />
      
      {activePage === 'home' && (
        <Home 
          count={count} 
          setCount={setCount}
          backgroundImage={backgroundImage}
        />
      )}
      
      {activePage === 'faq' && <FAQ />}
    </>
  )
}

export default App
