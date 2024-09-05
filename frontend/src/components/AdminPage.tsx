import React, { useState } from 'react';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { backend } from '../../declarations/backend';

interface FormData {
  title: string;
  content: string;
  imageUrl: string;
  imageDescription: string;
}

const AdminPage: React.FC = () => {
  const { control, handleSubmit, reset } = useForm<FormData>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await backend.createBlogPost(data.title, data.content);
      if (data.imageUrl) {
        await backend.addGalleryImage(data.imageUrl, data.imageDescription ? [data.imageDescription] : []);
      }
      reset();
      alert('Blog post and image added successfully!');
    } catch (error) {
      console.error('Error adding blog post or image:', error);
      alert('Error adding blog post or image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add New Blog Post
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: 'Title is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Title"
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="content"
          control={control}
          defaultValue=""
          rules={{ required: 'Content is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Content"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="imageUrl"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Image URL"
              fullWidth
              margin="normal"
            />
          )}
        />
        <Controller
          name="imageDescription"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Image Description"
              fullWidth
              margin="normal"
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </form>
    </Box>
  );
};

export default AdminPage;
