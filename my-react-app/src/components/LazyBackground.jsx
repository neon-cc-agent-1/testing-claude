import { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react';

function LazyBackground({ src, children, className, style, placeholder = '#242424' }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef(null);

  // Memoize observer options to prevent recreation on each render
  const observerOptions = useMemo(() => ({ 
    threshold: 0.1, 
    rootMargin: '200px' // Start loading when within 200px of viewport
  }), []);

  // Optimize IntersectionObserver with proper cleanup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      observerOptions
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      observer.disconnect();
    };
  }, [observerOptions]);

  // Image loaded handler with useCallback
  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Load image when in view with proper cleanup
  useEffect(() => {
    if (!isInView || !src) return;
    
    const img = new Image();
    
    // Set up image loading
    img.onload = handleImageLoad;
    img.onerror = (e) => console.error('Error loading background image:', e);
    
    // Set image source to start loading
    img.src = src;
    
    // Cleanup function - prevent setting state on unmounted component
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [isInView, src, handleImageLoad]);

  // Use preconnect hint for external images
  useEffect(() => {
    if (src && typeof src === 'string' && src.startsWith('http') && isInView) {
      const linkEl = document.createElement('link');
      linkEl.rel = 'preconnect';
      linkEl.href = new URL(src).origin;
      document.head.appendChild(linkEl);
      
      return () => {
        if (document.head.contains(linkEl)) {
          document.head.removeChild(linkEl);
        }
      };
    }
  }, [src, isInView]);

  // Memoize styles to prevent recreation on each render
  const elementStyle = useMemo(() => ({
    ...style,
    ...(isLoaded 
      ? { 
          backgroundImage: `url(${src})`,
          backgroundSize: style?.backgroundSize || 'cover',
          backgroundPosition: style?.backgroundPosition || 'center',
        } 
      : { backgroundColor: placeholder }),
    transition: 'background 0.3s ease-in-out'
  }), [style, isLoaded, src, placeholder]);

  return (
    <div 
      ref={elementRef}
      className={className}
      style={elementStyle}
    >
      {children}
    </div>
  );
}

export default memo(LazyBackground);