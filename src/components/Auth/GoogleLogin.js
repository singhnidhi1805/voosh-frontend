import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { googleLogin } from '../../services/authService';

const GoogleLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Check if token is present in the URL
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');

    if (token) {
      localStorage.setItem('token', token);
      
navigate('https://vooshfrontend.vercel.app/dashboard'); // Store the token in localStorage
       // Redirect to dashboard
    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    googleLogin();
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <Button
        onClick={handleGoogleLogin}
        variant="contained"
        color="primary"
        startIcon={<GoogleIcon />}
        sx={{
          backgroundColor: '#4285F4',
          color: 'white',
          '&:hover': {
            backgroundColor: '#357ae8',
          },
          textTransform: 'none',
          px: 3,
          py: 1,
        }}
      >
        Sign in with Google
      </Button>
    </Box>
  );
};

export default GoogleLogin;
