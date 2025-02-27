import React, { useState } from 'react';
import { useLogin, useNdk } from 'nostr-hooks';
import {
  Button,
  Snackbar,
  Alert,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
  FormHelperText
} from '@mui/material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const LoginWithSecretKey = ({ onClose }: { onClose: () => void }) => {
  const { setSigner } = useNdk();
  const { loginWithPrivateKey } = useLogin();
  const [nsecInput, setNsecInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginWithSecretKey = () => {
    if (!nsecInput.trim()) {
      setErrorMessage('シークレットキーを入力してください');
      setOpen(true);
      return;
    }

    setLoading(true);
    loginWithPrivateKey({
      privateKey: nsecInput,
      onError: (err) => {
        console.error('LoginWithSecretKey failed:', err);
        setErrorMessage('シークレットキーでのログインに失敗しました。正しいキーを入力してください。');
        setOpen(true);
        setLoading(false);
      },
      onSuccess: (signer) => {
        console.log('LoginWithSecretKey successful:', signer);
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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
          既存のNostrアカウントをお持ちの場合は、シークレットキーを入力してログインします。
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          シークレットキーは「nsec」で始まる文字列です。安全に保管してください。
        </Typography>
      </Paper>

      <TextField
        label="シークレットキー"
        variant="outlined"
        value={nsecInput}
        onChange={(e) => setNsecInput(e.target.value)}
        fullWidth
        margin="normal"
        type={showPassword ? 'text' : 'password'}
        placeholder="nsec..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <VpnKeyIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={toggleShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
          sx: { borderRadius: 1.5 }
        }}
      />
      <FormHelperText sx={{ mb: 2, ml: 1 }}>
        シークレットキーは安全に保管され、サーバーに送信されることはありません
      </FormHelperText>

      <Button
        variant="contained"
        onClick={handleLoginWithSecretKey}
        fullWidth
        size="large"
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        sx={{
          py: 1.5,
          borderRadius: 2,
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
          color: 'white',
          fontWeight: 'bold',
          textTransform: 'none',
          fontSize: '1rem',
          mt: 1
        }}
      >
        {loading ? 'ログイン中...' : 'シークレットキーでログイン'}
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
