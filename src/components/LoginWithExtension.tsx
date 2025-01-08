import React, { useState } from 'react';
import { useLogin, useNdk } from 'nostr-hooks';
import { Button, Snackbar, Alert } from '@mui/material';

export const LoginWithExtension = ({ onClose }: { onClose: () => void }) => {
  const { setSigner } = useNdk();
  const { loginWithExtension } = useLogin();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleLoginWithExtension = () => {
    loginWithExtension({
      onError: (err) => {
        console.error('LoginWithExtension failed:', err);
        setErrorMessage('LoginWithExtension failed. Please try again.');
        setOpen(true);
      },
      onSuccess: (signer) => {
        console.log('LoginWithExtension successful:', signer);
        setSigner(signer);
        setErrorMessage(null); // 成功した場合はエラーメッセージをクリア
        onClose(); // ログイン成功時にonCloseを呼び出す
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
      <Button variant="contained" onClick={handleLoginWithExtension} sx={{ backgroundColor: 'black', color: 'white' }}>
        Login with Extension
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
