import { useActiveUser } from 'nostr-hooks';
import { useProfile } from 'nostr-hooks';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './ActiveUser.css';
export const ActiveUser = () => {
  const { activeUser, status } = useActiveUser();
  const { profile } = useProfile({ pubkey: activeUser?.pubkey });

  if (activeUser === undefined) return <Typography>Loading... </Typography>;

  if (activeUser === null) return <Typography>Not logged in</Typography>;

  console.log(status);

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {profile?.image && <Avatar src={profile.image} alt="Profile" />}
      <Typography variant="body1" color="inherit">
        {profile?.displayName}
      </Typography>
    </Box>
  );
};
