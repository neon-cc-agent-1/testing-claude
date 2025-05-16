import { useState, useEffect } from 'react';
import LazyImage from './LazyImage';
import '../App.css';
import '../styles/Gallery.css';

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This is a mock function to simulate loading images from an API
    const fetchImages = async () => {
      setLoading(true);
      
      // In a real app, this would be an API call
      // For example: const response = await fetch('https://api.example.com/images');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock image data
      const mockImages = [
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
      
      setImages(mockImages);
      setLoading(false);
    };

    fetchImages();
  }, []);

  if (loading) {
    return <div className="gallery-loading">Loading gallery...</div>;
  }

  return (
    <div className="gallery-container">
      <h2>Image Gallery</h2>
      <p>All images below use lazy loading for optimal performance</p>
      
      <div className="gallery-grid">
        {images.map((image) => (
          <div key={image.id} className="gallery-item">
            <LazyImage
              src={image.url}
              alt={image.title}
              placeholderSrc={image.thumbnail}
              className="gallery-image"
              threshold={0.2}
            />
            <p className="gallery-title">{image.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;