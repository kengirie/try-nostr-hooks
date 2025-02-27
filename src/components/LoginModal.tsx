// LoginModal.tsx
import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import ExtensionIcon from '@mui/icons-material/Extension';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import { LoginWithExtension } from './LoginWithExtension';
import { LoginWithSecretKey } from './LoginWithSecKey';

export const LoginModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [value, setValue] = React.useState('1');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          borderRadius: 2,
          minWidth: { xs: '100%', sm: '450px' },
          maxWidth: '550px',
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'primary.main',
        color: 'white',
        py: 2
      }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          ログイン
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <TabContext value={value}>
          <Paper elevation={1} sx={{ borderRadius: 0 }}>
            <TabList
              onChange={handleChange}
              aria-label="login options"
              variant="fullWidth"
              sx={{
                '& .MuiTab-root': {
                  py: 2,
                  fontWeight: 'medium',
                  textTransform: 'none',
                  fontSize: '1rem'
                },
                '& .Mui-selected': {
                  fontWeight: 'bold',
                  color: 'primary.main'
                }
              }}
            >
              <Tab
                label="拡張機能"
                value="1"
                icon={<ExtensionIcon />}
                iconPosition="start"
              />
              <Tab
                label="シークレットキー"
                value="2"
                icon={<VpnKeyIcon />}
                iconPosition="start"
              />
              <Tab
                label="初めての方"
                value="3"
                icon={<HelpOutlineIcon />}
                iconPosition="start"
              />
            </TabList>
          </Paper>
          <Box sx={{ p: 3 }}>
            <TabPanel value="1" sx={{ p: 0, pt: 2 }}>
              <LoginWithExtension onClose={onClose} />
            </TabPanel>
            <TabPanel value="2" sx={{ p: 0, pt: 2 }}>
              <LoginWithSecretKey onClose={onClose} />
            </TabPanel>
            <TabPanel value="3" sx={{ p: 0, pt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Nostrへようこそ！
              </Typography>
              <Typography variant="body1" paragraph>
                Nostrは分散型のソーシャルネットワークプロトコルです。始めるには：
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" sx={{ mb: 1 }}>
                  <strong>拡張機能</strong>：Nos2xなどのブラウザ拡張機能をインストールして簡単にログイン
                </Typography>
                <Typography component="li" sx={{ mb: 1 }}>
                  <strong>シークレットキー</strong>：既存のNostrアカウントをお持ちの場合はシークレットキーでログイン
                </Typography>
              </Box>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => setValue('1')}
              >
                拡張機能でログインする
              </Button>
            </TabPanel>
          </Box>
        </TabContext>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, borderTop: 1, borderColor: 'divider' }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 3
          }}
        >
          キャンセル
        </Button>
      </DialogActions>
    </Dialog>
  );
};
