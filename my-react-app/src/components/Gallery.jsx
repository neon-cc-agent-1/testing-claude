import { useState, useEffect, memo, useCallback, useMemo } from 'react';
import LazyImage from './LazyImage';
import '../App.css';
import '../styles/Gallery.css';

// Memoized gallery item component to prevent unnecessary re-renders
const GalleryItem = memo(({ image }) => {
  return (
    <div key={image.id} className="gallery-item">
      <LazyImage
        src={image.url}
        alt={image.title}
        placeholder="#e1e1e1"
        className="gallery-image"
        width="100%"
        height="auto"
      />
      <p className="gallery-title">{image.title}</p>
    </div>
  );
});

// Mock image data - moved outside to prevent recreation on each render
const mockImageData = [
  {
    id: '1',
    title: 'Mountain Landscape',
    url: 'https://random.imagecdn.app/800/600?image=1',
    thumbnail: 'https://random.imagecdn.app/100/100?blur=5&image=1'
  },
  {
    id: '2',
    title: 'Ocean View',
    url: 'https://random.imagecdn.app/800/600?image=2',
    thumbnail: 'https://random.imagecdn.app/100/100?blur=5&image=2'
  },
  {
    id: '3',
    title: 'City Skyline',
    url: 'https://random.imagecdn.app/800/600?image=3',
    thumbnail: 'https://random.imagecdn.app/100/100?blur=5&image=3'
  },
  {
    id: '4',
    title: 'Forest Path',
    url: 'https://random.imagecdn.app/800/600?image=4',
    thumbnail: 'https://random.imagecdn.app/100/100?blur=5&image=4'
  },
  {
    id: '5',
    title: 'Desert Sunset',
    url: 'https://random.imagecdn.app/800/600?image=5',
    thumbnail: 'https://random.imagecdn.app/100/100?blur=5&image=5'
  }
];

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use fetchImages only once with useCallback to prevent recreation on each render
  const fetchImages = useCallback(async () => {
    setLoading(true);
    
    // Simulate API delay - in real apps this would be a network request
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setImages(mockImageData);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Memoized gallery items to prevent recreation on each render
  const galleryItems = useMemo(() => {
    return images.map(image => (
      <GalleryItem key={image.id} image={image} />
    ));
  }, [images]);

  if (loading) {
    return <div className="gallery-loading">Loading gallery...</div>;
  }

  return (
    <div className="gallery-container">
      <h2>Image Gallery</h2>
      <p>All images below use lazy loading for optimal performance</p>
      
      <div className="gallery-grid">
        {galleryItems}
      </div>
    </div>
  );
}

export default memo(Gallery);