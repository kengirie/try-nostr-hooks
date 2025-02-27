import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment
} from '@mui/material';
import {
  Image as ImageIcon,
  Title as TitleIcon,
  Description as DescriptionIcon,
  Check as CheckIcon
} from '@mui/icons-material';

interface CreatePublicChannelProps {
  onComplete?: () => void;
}

export const CreatePublicChannel = ({ onComplete }: CreatePublicChannelProps) => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [picture, setPicture] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { ndk } = useNdk();

  const isFormValid = name.trim() !== '';

  const handlePublish = async () => {
    if (!isFormValid) {
      setError('チャンネル名は必須です');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const event = new NDKEvent(ndk);
      event.content = JSON.stringify({
        name: name.trim(),
        about: about.trim(),
        picture: picture.trim(),
        relays: ndk?.explicitRelayUrls
      });
      event.kind = 40;
      await event.publish();

      setSuccess(true);
      setName('');
      setAbout('');
      setPicture('');

      setTimeout(() => {
        setSuccess(false);
        if (onComplete) {
          onComplete();
        }
      }, 2000);
    } catch (err) {
      setError(`エラーが発生しました: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        新規パブリックチャンネルの作成
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          チャンネルが作成されました！
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="チャンネル名"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="チャンネル名を入力"
            variant="outlined"
            disabled={isSubmitting}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TitleIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="説明"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="チャンネルの説明を入力"
            variant="outlined"
            multiline
            rows={3}
            disabled={isSubmitting}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="画像URL"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            placeholder="チャンネルの画像URLを入力"
            variant="outlined"
            disabled={isSubmitting}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ImageIcon />
                </InputAdornment>
              ),
            }}
            helperText="チャンネルのアイコンとして使用される画像のURL"
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePublish}
              disabled={!isFormValid || isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : <CheckIcon />}
            >
              {isSubmitting ? '作成中...' : 'チャンネルを作成'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
