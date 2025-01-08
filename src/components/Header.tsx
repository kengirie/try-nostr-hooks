import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';
import { ActiveUser } from './ActiveUser';
import { useLogin } from 'nostr-hooks';
import { useState } from 'react';
import { useActiveUser } from 'nostr-hooks';
import { useProfile } from 'nostr-hooks';
import { UserIcon } from './UserIcon';
import { LoginButton } from './LoginButton';

export const Header = () => {

    const { activeUser } = useActiveUser();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: 'black', color: 'white' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Test Application
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" component={Link} to="/channel">
            Channel
          </Button>
          {activeUser ? <UserIcon /> : <LoginButton />}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};
