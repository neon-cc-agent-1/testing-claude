import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'

// Lazy load the App component for faster initial load
const App = lazy(() => import('./App.jsx'))

// Use environment variable or fallback for Google Client ID
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID'

// Move LoadingScreen to separate file to avoid react-refresh warning
import LoadingScreen from './utils/LoadingScreen'

// Register a service worker for caching in production
if ('serviceWorker' in navigator && import.meta.env.MODE === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(error => {
        console.log('SW registration failed: ', error);
      });
  });
}

// Add performance monitoring (disabled for now)
// function reportWebVitals(metric) {
//   if (import.meta.env.MODE === 'development') {
//     console.log(metric);
//   } else {
//     // In production, you could send to an analytics service
//     // Example: sendToAnalytics(metric)
//   }
// }

// Mount the application
const rootElement = document.getElementById('root');
createRoot(rootElement).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <Suspense fallback={<LoadingScreen />}>
        <App />
      </Suspense>
    </GoogleOAuthProvider>
  </StrictMode>
);

// Preload critical resources
const preloadResources = () => {
  // Only preload in production - in development this causes unnecessary load
  if (import.meta.env.MODE === 'production' && 'requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Preload key images, fonts, or other resources
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = '/src/assets/react.svg';
      document.head.appendChild(preloadLink);
    });
  }
};

preloadResources();
