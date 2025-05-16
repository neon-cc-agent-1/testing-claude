import { useState, useEffect, useRef } from 'react';

function LazyImage({ src, alt, className, style, placeholderSrc, threshold = 0.1, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  // Use native loading="lazy" as a fallback
  const nativeLazyLoading = 'loading' in HTMLImageElement.prototype;

  useEffect(() => {
    // Skip if native lazy loading is supported and we're not using a placeholder
    if (nativeLazyLoading && !placeholderSrc) return;

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

    const currentImgRef = imgRef.current;
    if (currentImgRef) {
      observer.observe(currentImgRef);
    }

    return () => {
      if (currentImgRef) {
        observer.unobserve(currentImgRef);
      }
    };
  }, [threshold, nativeLazyLoading, placeholderSrc]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  // If using placeholder, we need to control when to load the actual image
  const imageSrc = placeholderSrc && !isInView ? placeholderSrc : src;

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className || ''} ${isLoaded ? 'loaded' : 'loading'}`}
      style={{
        transition: 'opacity 0.3s ease',
        opacity: isLoaded ? 1 : 0.5,
        ...style
      }}
      loading={nativeLazyLoading && !placeholderSrc ? 'lazy' : undefined}
      onLoad={handleImageLoad}
      {...props}
    />
  );
}

export default LazyImage;