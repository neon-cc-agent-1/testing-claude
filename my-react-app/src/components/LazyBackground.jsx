import { useState, useEffect, useRef, useMemo } from 'react';

function LazyBackground({ src, children, className, style, placeholder = '#242424' }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef(null);

  const observer = useMemo(() => {
    const instance = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            instance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5, rootMargin: '200px' }
    );
    return instance;
  }, []);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [observer]);

  // Load image when in view
  useEffect(() => {
    if (!isInView || !src) return;
    
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = src;
  }, [isInView, src]);

  // Combined styles
  const elementStyle = {
    ...style,
    ...(isLoaded 
      ? { backgroundImage: `url(${src})` } 
      : { backgroundColor: placeholder }),
    transition: 'background 0.3s ease-in-out'
  };

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

export default LazyBackground;