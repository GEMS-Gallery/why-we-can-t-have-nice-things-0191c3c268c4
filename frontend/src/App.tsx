import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import Gallery from './components/Gallery';
import AdminPage from './components/AdminPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3498db',
    },
    secondary: {
      main: '#2c3e50',
    },
    error: {
      main: '#e74c3c',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Why We Can't Have Nice Things
          </Typography>
          <Link to="/" style={{ color: 'white', marginRight: '1rem' }}>Home</Link>
          <Link to="/admin" style={{ color: 'white' }}>Admin</Link>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<><BlogList /><Gallery /></>} />
          <Route path="/post/:id" element={<BlogPost />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
