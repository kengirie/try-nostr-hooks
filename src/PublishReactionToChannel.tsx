import { NDKEvent, NDKTag } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { useState } from 'react';
import {
  IconButton,
  Tooltip,
  Badge,
  CircularProgress,
  Snackbar,
  Alert,
  Box
} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

export const PublishReactionToChannel = ({ event, reactionCount = 0 }: { event: NDKEvent, reactionCount?: number }) => {
  const [loading, setLoading] = useState(false);
  const [hasReacted, setHasReacted] = useState(false);
  const [localCount, setLocalCount] = useState(reactionCount);
  const [error, setError] = useState<string | null>(null);

  const { ndk } = useNdk();

  const handlePublish = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const eventReaction = new NDKEvent(ndk);
      eventReaction.content = "+";
      const tags: NDKTag[] = [
        ['e', event.id],
        ['p', event.pubkey]
      ];
      eventReaction.tags = tags;
      eventReaction.kind = 7;
      await eventReaction.publish();

      // リアクション成功時の状態更新
      setHasReacted(true);
      setLocalCount(prev => prev + 1);
      setError(null);
    } catch (err) {
      console.error('リアクション投稿エラー:', err);
      setError('リアクションの投稿に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
      <Tooltip title={hasReacted ? "リアクション済み" : "いいね！"}>
        <span>
          <IconButton
            onClick={handlePublish}
            disabled={loading}
            color={hasReacted ? "primary" : "default"}
            sx={{
              transition: 'transform 0.2s, color 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
                color: 'primary.main'
              },
              '&:active': {
                transform: 'scale(0.95)'
              }
            }}
            aria-label="いいね"
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : hasReacted ? (
              <ThumbUpAltIcon fontSize="medium" />
            ) : (
              <ThumbUpOffAltIcon fontSize="medium" />
            )}
          </IconButton>
        </span>
      </Tooltip>

      {localCount > 0 && (
        <Badge
          badgeContent={localCount}
          color="primary"
          sx={{
            ml: 0.5,
            '& .MuiBadge-badge': {
              fontSize: '0.75rem',
              height: '20px',
              minWidth: '20px',
              borderRadius: '10px'
            }
          }}
        />
      )}

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};
