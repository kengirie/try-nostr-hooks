import { useEffect, useState } from 'react';
import { useSubscription } from 'nostr-hooks';
import { Link } from 'react-router-dom';
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  Divider,
  Skeleton,
  Pagination,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Paper
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
  Chat as ChatIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { CreatePublicChannel } from './components/CreatePublicChannel';

export const PublicChannel = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [showCreateChannel, setShowCreateChannel] = useState(false);

  const { events, isLoading, createSubscription, removeSubscription } = useSubscription('32');

  useEffect(() => {
    const filters = [{ kinds: [40], limit: 20 }];
    createSubscription(filters);

    return () => {
      removeSubscription();
    };
  }, [createSubscription, removeSubscription]);

  const handleRefresh = () => {
    removeSubscription();
    const filters = [{ kinds: [40], limit: 20 }];
    createSubscription(filters);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const filteredEvents = events ? events
    .filter(event => {
      try {
        const content = JSON.parse(event.content);
        return content.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
               content.about?.toLowerCase().includes(searchTerm.toLowerCase());
      } catch (e) {
        return false;
      }
    })
    // 新しい順（created_atの降順）でソート
    .sort((a, b) => {
      // created_atが存在しない場合は0（同等）として扱う
      const timeA = a.created_at || 0;
      const timeB = b.created_at || 0;
      return timeB - timeA; // 降順（新しい順）
    }) : [];

  const paginatedEvents = filteredEvents.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(filteredEvents.length / limit);

  const renderSkeletons = () => {
    return Array.from(new Array(6)).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Skeleton variant="rectangular" height={40} width="60%" />
            <Skeleton variant="text" sx={{ mt: 1 }} />
            <Skeleton variant="text" />
            <Skeleton variant="text" width="80%" />
          </CardContent>
          <CardActions>
            <Skeleton variant="rectangular" width={100} height={36} />
          </CardActions>
        </Card>
      </Grid>
    ));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            パブリックチャンネル
          </Typography>
          <Box>
            <Tooltip title="チャンネルを更新">
              <IconButton onClick={handleRefresh} color="primary">
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowCreateChannel(!showCreateChannel)}
              sx={{ ml: 1 }}
            >
              新規チャンネル作成
            </Button>
          </Box>
        </Box>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="チャンネルを検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {showCreateChannel && (
          <Box sx={{ mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
            <CreatePublicChannel onComplete={() => {
              setShowCreateChannel(false);
              handleRefresh();
            }} />
          </Box>
        )}

        {isLoading ? (
          <Grid container spacing={3}>
            {renderSkeletons()}
          </Grid>
        ) : !events || events.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="h6" color="text.secondary">
              チャンネルが見つかりませんでした
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowCreateChannel(true)}
              sx={{ mt: 2 }}
            >
              最初のチャンネルを作成
            </Button>
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {paginatedEvents.map((event) => {
                let content;
                try {
                  content = JSON.parse(event.content);
                } catch (e) {
                  console.error('Error parsing JSON:', e);
                  content = { name: 'Error parsing JSON' };
                }

                return (
                  <Grid item xs={12} sm={6} md={4} key={event.id}>
                    <Card sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6
                      }
                    }}>
                      {content.picture && (
                        <Box
                          sx={{
                            height: 140,
                            backgroundImage: `url(${content.picture})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        />
                      )}
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Avatar
                            src={content.picture}
                            sx={{ mr: 1, width: 32, height: 32 }}
                          >
                            {content.name?.charAt(0) || '?'}
                          </Avatar>
                          <Typography variant="h6" component="h2" noWrap>
                            {content.name || 'Unnamed Channel'}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            height: '4.5em'
                          }}
                        >
                          {content.about || 'No description available'}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                          <Chip size="small" label="Public" color="primary" />
                          {content.relays && content.relays.length > 0 && (
                            <Tooltip title={`Relays: ${content.relays.join(', ')}`}>
                              <Chip size="small" label={`${content.relays.length} relay(s)`} variant="outlined" />
                            </Tooltip>
                          )}
                        </Box>
                      </CardContent>
                      <Divider />
                      <CardActions>
                        <Button
                          component={Link}
                          to={`/channel/${event.id}`}
                          variant="contained"
                          color="primary"
                          startIcon={<ChatIcon />}
                          fullWidth
                        >
                          チャットに参加
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>

            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}
      </Paper>
    </Container>
  );
};
