import { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react';

function LazyImage({ src, alt, className, style, width, height, placeholder = '#242424' }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  // Optimize IntersectionObserver with useMemo to prevent recreation on each render
  const observerOptions = useMemo(() => ({ 
    threshold: 0.1, 
    rootMargin: '200px', // Start loading when within 200px of viewport
  }), []);

  useEffect(() => {
    // Create observer only once
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

    const currentImgRef = imgRef.current;
    if (currentImgRef) {
      observer.observe(currentImgRef);
    }

    // Cleanup function
    return () => {
      if (currentImgRef) {
        observer.unobserve(currentImgRef);
      }
      observer.disconnect();
    };
  }, [observerOptions]);

  // Optimize image load handler with useCallback
  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Memoize styles to prevent recreation on each render
  const containerStyle = useMemo(() => ({
    backgroundColor: placeholder,
    width: width,
    height: height,
    display: 'inline-block',
    overflow: 'hidden',
    position: 'relative',
  }), [placeholder, width, height]);

  // Memoize image styles to prevent recreation on each render
  const imageStyle = useMemo(() => ({
    ...style,
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    backgroundColor: placeholder,
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  }), [style, isLoaded, placeholder]);

  // Use preconnect hint for external images
  useEffect(() => {
    if (src && typeof src === 'string' && src.startsWith('http') && isInView) {
      const linkEl = document.createElement('link');
      linkEl.rel = 'preconnect';
      linkEl.href = new URL(src).origin;
      document.head.appendChild(linkEl);
      
      return () => {
        document.head.removeChild(linkEl);
      };
    }
  }, [src, isInView]);

  return (
    <div ref={imgRef} style={containerStyle}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={className}
          style={imageStyle}
          onLoad={handleImageLoad}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          fetchPriority={src.includes('logo') ? 'high' : 'auto'}
        />
      )}
    </div>
  );
}

export default memo(LazyImage);