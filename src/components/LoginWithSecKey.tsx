import React, { useState } from 'react';
import { useLogin, useNdk } from 'nostr-hooks';
import { Button, Snackbar, Alert, TextField } from '@mui/material';

export const LoginWithSecretKey = ({ onClose }: { onClose: () => void }) => {
  const { setSigner } = useNdk();
  const { loginWithPrivateKey } = useLogin();
  const [nsecInput, setNsecInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleLoginWithExtension = () => {
    loginWithPrivateKey({
      privateKey: nsecInput,
      onError: (err) => {
        console.error('LoginWithSecretKey failed:', err);
        setErrorMessage('LoginWithSecretKey failed. Please try again.');
        setOpen(true);
      },
      onSuccess: (signer) => {
        console.log('LoginWithSecretKey successful:', signer);
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
      <TextField
        label="Secret Key"
        variant="outlined"
        value={nsecInput}
        onChange={(e) => setNsecInput(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleLoginWithExtension} sx={{ backgroundColor: 'black', color: 'white' }}>
        Login with Secret Key
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
