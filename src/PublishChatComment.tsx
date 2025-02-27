import { NDKEvent, NDKTag } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Paper,
  CircularProgress,
  InputAdornment,
  Snackbar,
  Alert
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';

export const PublishChatComment = ({ event }: { event: NDKEvent }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { ndk } = useNdk();

  const handlePublish = async () => {
    if (!content.trim()) {
      setError('コメントを入力してください');
      return;
    }

    setLoading(true);
    try {
      const eventReaction = new NDKEvent(ndk);
      eventReaction.content = content;
      const tags: NDKTag[] = [
        ['e', event.id, "root"]
      ];
      eventReaction.tags = tags;
      eventReaction.kind = 42;
      await eventReaction.publish();

      setContent(''); // 送信後にフィールドをクリア
      setSuccess(true);
      setError(null);
    } catch (err) {
      console.error('コメント投稿エラー:', err);
      setError('コメントの投稿に失敗しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handlePublish();
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
    setError(null);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        mb: 2
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
        <TextField
          placeholder="コメントを入力..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={handleKeyPress}
          fullWidth
          multiline
          minRows={1}
          maxRows={4}
          disabled={loading}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ChatIcon color="action" fontSize="small" />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 2,
              '& fieldset': {
                borderColor: 'divider',
              },
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handlePublish}
          disabled={loading || !content.trim()}
          sx={{
            borderRadius: 2,
            minWidth: '120px',
            height: '56px',
            textTransform: 'none',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
          }}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
        >
          {loading ? '送信中...' : 'コメント'}
        </Button>
      </Box>

      <Snackbar
        open={Boolean(success) || Boolean(error)}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={error ? "error" : "success"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error || 'コメントを投稿しました！'}
        </Alert>
      </Snackbar>
    </Paper>
  );
};
