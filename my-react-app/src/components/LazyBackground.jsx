import { useState, useEffect, useRef } from 'react';

function LazyBackground({ 
  src, 
  children, 
  className, 
  style, 
  placeholderSrc,
  threshold = 0.1,
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    const currentElementRef = elementRef.current;
    if (currentElementRef) {
      observer.observe(currentElementRef);
    }

    return () => {
      if (currentElementRef) {
        observer.unobserve(currentElementRef);
      }
    };
  }, [threshold]);

  useEffect(() => {
    // When element comes into view or if it's already in view when mounted
    if (isInView || !placeholderSrc) {
      const img = new Image();
      
      img.onload = () => {
        setCurrentSrc(src);
        setIsLoaded(true);
      };
      
      img.onerror = () => {
        console.error('Failed to load image:', src);
        // Keep placeholder if main image fails to load
        if (placeholderSrc) {
          setCurrentSrc(placeholderSrc);
        }
      };
      
      img.src = src;
    } else if (placeholderSrc) {
      setCurrentSrc(placeholderSrc);
    }
  }, [src, placeholderSrc, isInView]);

  const backgroundStyle = {
    backgroundImage: currentSrc ? `url(${currentSrc})` : 'none',
    transition: 'opacity 0.3s ease',
    opacity: isLoaded ? 1 : 0.5,
    ...style
  };

  return (
    <div
      ref={elementRef}
      className={`${className || ''} ${isLoaded ? 'bg-loaded' : 'bg-loading'}`}
      style={backgroundStyle}
      {...props}
    >
      {children}
    </div>
  );
}

export default LazyBackground;