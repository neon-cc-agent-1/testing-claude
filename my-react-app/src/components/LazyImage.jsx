import { useState, useEffect, useRef } from 'react';

function LazyImage({ src, alt, className, style, width, height, placeholder = '#242424' }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

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
      { threshold: 0.1, rootMargin: '200px' } // Start loading when within 200px of viewport
    );

    const currentImgRef = imgRef.current;
    if (currentImgRef) {
      observer.observe(currentImgRef);
    }

    return () => {
      if (currentImgRef) {
        observer.unobserve(currentImgRef);
      }
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  // Combined styles
  const imageStyle = {
    ...style,
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    backgroundColor: placeholder
  };

  return (
    <div 
      ref={imgRef}
      style={{ 
        backgroundColor: placeholder,
        width: width,
        height: height,
        display: 'inline-block',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
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
        />
      )}
    </div>
  );
}

export default LazyImage;