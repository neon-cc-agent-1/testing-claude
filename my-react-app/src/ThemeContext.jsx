import { createContext, useState, useContext, useEffect } from 'react'

const ThemeContext = createContext({
  theme: 'default',
  toggleTheme: () => {},
})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('default')

  const toggleTheme = () => {
    setTheme(theme === 'default' ? 'orangeyellow' : 'default')
  }

  useEffect(() => {
    // Apply theme to body
    document.body.className = theme === 'orangeyellow' ? 'theme-orangeyellow' : ''
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}