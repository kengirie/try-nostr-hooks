import { Button } from '@mui/material';
import { LoginModal } from './LoginModal';
import { useState } from 'react';

export const LoginButton = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const handleOpenLoginModal = () => {
    setLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpenLoginModal}>
        Login
      </Button>
      <LoginModal open={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </div>
  );
};
