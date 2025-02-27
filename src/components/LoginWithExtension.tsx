import React, { useState } from 'react';
import { useLogin, useNdk } from 'nostr-hooks';
import {
  Button,
  Snackbar,
  Alert,
  Typography,
  Paper,
  CircularProgress
} from '@mui/material';
import ExtensionIcon from '@mui/icons-material/Extension';

export const LoginWithExtension = ({ onClose }: { onClose: () => void }) => {
  const { setSigner } = useNdk();
  const { loginWithExtension } = useLogin();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoginWithExtension = () => {
    setLoading(true);
    loginWithExtension({
      onError: (err) => {
        console.error('LoginWithExtension failed:', err);
        setErrorMessage('拡張機能でのログインに失敗しました。もう一度お試しください。');
        setOpen(true);
        setLoading(false);
      },
      onSuccess: (signer) => {
        console.log('LoginWithExtension successful:', signer);
        setSigner(signer);
        setErrorMessage(null);
        setLoading(false);
        onClose();
      },
    });
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: 1,
          borderColor: 'divider'
        }}
      >
        <Typography variant="body1" paragraph>
          Nos2x、Albyなどのブラウザ拡張機能を使用してログインします。
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          拡張機能がインストールされていない場合は、「初めての方」タブをご覧ください。
        </Typography>
      </Paper>

      <Button
        variant="contained"
        onClick={handleLoginWithExtension}
        fullWidth
        size="large"
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ExtensionIcon />}
        sx={{
          py: 1.5,
          borderRadius: 2,
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
          color: 'white',
          fontWeight: 'bold',
          textTransform: 'none',
          fontSize: '1rem'
        }}
      >
        {loading ? '接続中...' : '拡張機能でログイン'}
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
