import { Button, Box, Tooltip } from '@mui/material';
import { LoginModal } from './LoginModal';
import { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';

export const LoginButton = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const handleOpenLoginModal = () => {
    setLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <Box>
      <Tooltip title="ログイン">
        <Button
          variant="contained"
          onClick={handleOpenLoginModal}
          startIcon={<LoginIcon />}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 'medium',
            px: 2,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            '&:hover': {
              boxShadow: '0 5px 8px 2px rgba(33, 203, 243, .4)',
            }
          }}
        >
          ログイン
        </Button>
      </Tooltip>
      <LoginModal open={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </Box>
  );
};
