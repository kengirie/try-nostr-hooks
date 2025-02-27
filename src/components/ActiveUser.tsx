import { useActiveUser } from 'nostr-hooks';
import { useProfile } from 'nostr-hooks';
import {
  Avatar,
  Typography,
  Box,
  Skeleton,
  Badge
} from '@mui/material';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';

interface ActiveUserProps {
  showName?: boolean;
  size?: 'small' | 'medium' | 'large';
  showStatus?: boolean;
}

export const ActiveUser = ({
  showName = false,
  size = 'medium',
  showStatus = false
}: ActiveUserProps) => {
  const { activeUser } = useActiveUser();
  const { profile } = useProfile({ pubkey: activeUser?.pubkey });
  const isLoading = !profile && activeUser?.pubkey;

  if (activeUser === undefined || activeUser === null) {
    return null;
  }

  // サイズに基づいてアバターのサイズを決定
  const avatarSizes = {
    small: { width: 32, height: 32 },
    medium: { width: 40, height: 40 },
    large: { width: 56, height: 56 }
  };

  // プロフィール名を取得（なければpubkeyの短縮形を表示）
  const displayName = profile?.name || profile?.displayName ||
    (activeUser?.pubkey ? `${activeUser.pubkey.slice(0, 6)}...` : 'ユーザー');

  const avatarContent = profile?.image ? (
    <Avatar
      src={profile.image}
      alt={displayName}
      sx={{
        ...avatarSizes[size],
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    />
  ) : (
    <Avatar
      sx={{
        ...avatarSizes[size],
        bgcolor: 'primary.main',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <AccountCircleIcon sx={{ fontSize: size === 'small' ? 20 : (size === 'medium' ? 24 : 32) }} />
    </Avatar>
  );

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {isLoading ? (
        <Skeleton
          variant="circular"
          width={avatarSizes[size].width}
          height={avatarSizes[size].height}
        />
      ) : showStatus ? (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          color="success"
          sx={{
            '& .MuiBadge-badge': {
              width: size === 'small' ? 8 : 10,
              height: size === 'small' ? 8 : 10,
              borderRadius: '50%',
              border: '2px solid white'
            }
          }}
        >
          {avatarContent}
        </Badge>
      ) : (
        avatarContent
      )}

      {showName && (
        <Box>
          {isLoading ? (
            <Skeleton variant="text" width={100} />
          ) : (
            <Typography
              variant={size === 'small' ? 'body2' : 'body1'}
              sx={{ fontWeight: 'medium' }}
            >
              {displayName}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};
