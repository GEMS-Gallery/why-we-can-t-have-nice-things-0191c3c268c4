import React, { useState, useEffect } from 'react';
import { ImageList, ImageListItem, ImageListItemBar, Typography, CircularProgress } from '@mui/material';
import { backend } from '../../declarations/backend';

interface Image {
  id: bigint;
  url: string;
  description: string;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await backend.getGalleryImages();
        setImages(result);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <ImageList sx={{ width: '100%', height: 'auto' }} cols={3} rowHeight={164}>
        {images.map((item) => (
          <ImageListItem key={item.id.toString()}>
            <img
              src={item.url}
              alt={item.description}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.description}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
      {images.length === 0 && (
        <Typography variant="body1">No images available. Add some reasons why we can't have nice things!</Typography>
      )}
    </>
  );
};

export default Gallery;
