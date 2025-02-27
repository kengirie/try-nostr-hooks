import { Button, Card, CardContent, Typography, Box, Container } from '@mui/material';
import { LoginModal } from './components/LoginModal';
import React, { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';

export const Login = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const handleOpenLoginModal = () => {
    setLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card elevation={3} sx={{
        borderRadius: 2,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6
        }
      }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
            ログイン
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
            アカウントにログインして、すべての機能にアクセスしましょう
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleOpenLoginModal}
              startIcon={<LoginIcon />}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '1.1rem'
              }}
            >
              ログインする
            </Button>
          </Box>
        </CardContent>
      </Card>
      <LoginModal open={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </Container>
  );
};
