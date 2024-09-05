import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Paper, CircularProgress } from '@mui/material';
import { backend } from '../../declarations/backend';

interface BlogPost {
  id: bigint;
  title: string;
  content: string;
  timestamp: bigint;
}

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await backend.getBlogPost(BigInt(id!));
        if ('ok' in result) {
          setPost(result.ok);
        } else {
          console.error('Error fetching blog post:', result.err);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!post) {
    return <Typography>Post not found</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {new Date(Number(post.timestamp) / 1000000).toLocaleString()}
      </Typography>
      <Typography variant="body1">{post.content}</Typography>
    </Paper>
  );
};

export default BlogPost;
