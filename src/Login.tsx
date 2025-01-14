import { Button } from '@mui/material';
import { LoginModal } from './components/LoginModal';
import React, { useState } from 'react';

export const Login = () => {
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
        Open Login Modal
      </Button>
      <LoginModal open={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </div>
  );
};
