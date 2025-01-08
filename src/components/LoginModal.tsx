// LoginModal.tsx
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box } from '@mui/system';

import { LoginWithExtension } from './LoginWithExtension';
import { LoginWithSecretKey } from './LoginWithSecKey';

export const LoginModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
           <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Extension" value="1" />
              <Tab label="SecretKey" value="2" />
              <Tab label="初めて" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"> <LoginWithExtension onClose={onClose} /></TabPanel>
          <TabPanel value="2"><LoginWithSecretKey onClose={onClose} /></TabPanel>
        <TabPanel value="3">初めて</TabPanel>
      </TabContext>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: 'black' }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
