import { useState } from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Typography,
  Paper,
  Tooltip,
  Badge
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useLogin, useActiveUser, useProfile } from 'nostr-hooks';

export const UserIcon = () => {
  const { logout } = useLogin();
  const { activeUser } = useActiveUser();
  const { profile } = useProfile({ pubkey: activeUser?.pubkey });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  // プロフィール名を取得（なければpubkeyの短縮形を表示）
  const displayName = profile?.name || profile?.displayName ||
    (activeUser?.pubkey ? `${activeUser.pubkey.slice(0, 6)}...` : 'ユーザー');

  return (
    <Box>
      <Tooltip title="アカウント設定">
        <IconButton
          size="medium"
          aria-label="アカウント設定"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          sx={{
            p: 0.5,
            border: '2px solid transparent',
            transition: 'all 0.2s',
            '&:hover': {
              border: '2px solid',
              borderColor: 'primary.light',
              bgcolor: 'transparent'
            }
          }}
        >
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            color="success"
            sx={{
              '& .MuiBadge-badge': {
                width: 10,
                height: 10,
                borderRadius: '50%',
                border: '2px solid white'
              }
            }}
          >
            {profile?.image ? (
              <Avatar
                src={profile.image}
                alt={displayName}
                sx={{
                  width: 40,
                  height: 40,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
            ) : (
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: 'primary.main',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <AccountCircleIcon />
              </Avatar>
            )}
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 220,
            borderRadius: 2,
            overflow: 'visible',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          }
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Paper
            elevation={0}
            sx={{
              p: 1.5,
              mb: 1,
              bgcolor: 'rgba(0, 0, 0, 0.02)',
              borderRadius: 1.5
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {profile?.image ? (
                <Avatar
                  src={profile.image}
                  alt={displayName}
                  sx={{ width: 36, height: 36, mr: 1.5 }}
                />
              ) : (
                <Avatar sx={{ width: 36, height: 36, mr: 1.5, bgcolor: 'primary.main' }}>
                  <AccountCircleIcon fontSize="small" />
                </Avatar>
              )}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  {displayName}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                  {activeUser?.pubkey ? `${activeUser.pubkey.slice(0, 8)}...${activeUser.pubkey.slice(-4)}` : ''}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        <Divider />

        <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="プロフィール" />
        </MenuItem>

        <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="設定" />
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: 'error.main' }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary="ログアウト" />
        </MenuItem>
      </Menu>
    </Box>
  );
};
