import { useEffect, useState } from 'react';
import { useSubscription } from 'nostr-hooks';
import { useParams } from 'react-router-dom';
import {
  Typography,
  List,
  ListItem,
  Card,
  CardContent,
  Container,
  Paper,
  Divider,
  Avatar,
  Box,
  Skeleton,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  ThumbUp as ThumbUpIcon,
  Message as MessageIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { PublishReactionToChannel } from './PublishReactionToChannel';
import { PublishChatComment } from './PublishChatComment';

interface ChannelInfo {
  name?: string;
  about?: string;
  picture?: string;
  relays?: string[];
}

export const PublicChat = () => {
  const { id } = useParams<{ id: string }>();
  const subId = `${id}-chats`;
  const subIdLikes = `${id}-likes`;
  const subIdAbouts = `${id}-abouts`;
  const [channelInfo, setChannelInfo] = useState<ChannelInfo | null>(null);

  const { events: reacts, isLoading: isReactLoading, createSubscription: createReactSubscription, removeSubscription: removeReactSubscription } = useSubscription(subIdLikes);

  const { events: abouts, isLoading: isAboutLoading, createSubscription: createAboutSubscription, removeSubscription: removeAboutSubscription } = useSubscription(subIdAbouts);

  const { events, isLoading, createSubscription, removeSubscription } = useSubscription(subId);

  useEffect(() => {
    if (!id) return () => {};

    const filters = [{ kinds: [42], limit: 20, '#e': [id] }];
    createSubscription(filters);

    return () => {
      removeSubscription();
    };
  }, [id, createSubscription, removeSubscription]);

  useEffect(() => {
    if (!id) return;
    const filters = [{ kinds: [7], limit: 20, '#e':[id] }];
    createReactSubscription(filters);
    return () => {
      removeReactSubscription();
    };
  }, [id, createReactSubscription, removeReactSubscription]);

  useEffect(() => {
    if (!id) return;
    const filters = [{ kinds:[40], ids:[id] }];
    createAboutSubscription(filters);
    return () => {
      removeAboutSubscription();
    };
  }, [id, createAboutSubscription, removeAboutSubscription]);

  useEffect(() => {
    if (abouts && abouts.length > 0) {
      try {
        const content = JSON.parse(abouts[0].content);
        setChannelInfo(content);
      } catch (e) {
        console.error('Error parsing channel info:', e);
      }
    }
  }, [abouts]);

  const handleRefresh = () => {
    removeSubscription();
    removeReactSubscription();
    removeAboutSubscription();

    const chatFilters = [{ kinds: [42], limit: 20, '#e': [id || ''] }];
    const reactFilters = [{ kinds: [7], limit: 20, '#e':[id || ''] }];
    const aboutFilters = [{ kinds:[40], ids:[id || ''] }];

    createSubscription(chatFilters);
    createReactSubscription(reactFilters);
    createAboutSubscription(aboutFilters);
  };

  const renderSkeletons = () => {
    return Array.from(new Array(3)).map((_, index) => (
      <ListItem key={`skeleton-${index}`} sx={{ mb: 2 }}>
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
              <Skeleton variant="text" width={120} />
            </Box>
            <Skeleton variant="rectangular" height={60} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={100} />
            </Box>
          </CardContent>
        </Card>
      </ListItem>
    ));
  };

  if (isLoading || isReactLoading || isAboutLoading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Skeleton variant="rectangular" height={40} width={200} />
            <Skeleton variant="circular" width={40} height={40} />
          </Box>
          <Divider sx={{ mb: 3 }} />
          <List>
            {renderSkeletons()}
          </List>
        </Paper>
      </Container>
    );
  }

  if (!events || !reacts || !abouts || abouts.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" sx={{ my: 4 }}>
            チャンネル情報が見つかりませんでした
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        {/* チャンネル情報ヘッダー */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                src={channelInfo?.picture}
                sx={{ width: 56, height: 56, mr: 2 }}
              >
                {channelInfo?.name?.charAt(0) || '?'}
              </Avatar>
              <Box>
                <Typography variant="h5" component="h1">
                  {channelInfo?.name || 'Unnamed Channel'}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                  <Chip
                    size="small"
                    label={`${events.length} メッセージ`}
                    icon={<MessageIcon fontSize="small" />}
                  />
                  <Chip
                    size="small"
                    label={`${reacts.length} リアクション`}
                    icon={<ThumbUpIcon fontSize="small" />}
                  />
                </Box>
              </Box>
            </Box>
            <Tooltip title="更新">
              <IconButton onClick={handleRefresh}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {channelInfo?.about && (
            <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
              {channelInfo.about}
            </Typography>
          )}

          <Divider sx={{ mb: 3 }} />

          {/* コメント投稿エリア */}
          <Box sx={{ mb: 3 }}>
            <PublishChatComment event={abouts[0]} />
          </Box>

          {/* リアクションエリア */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: 2,
              px: 3,
              mb: 2,
              bgcolor: 'rgba(0, 0, 0, 0.02)',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="body1" sx={{ mr: 2 }}>
              このチャンネルに「いいね」する：
            </Typography>
            <Box sx={{ transform: 'scale(1.2)' }}>
              <PublishReactionToChannel
                event={abouts[0]}
                reactionCount={reacts.length}
              />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* チャットメッセージ */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              fontWeight: 'bold',
              color: 'primary.main'
            }}
          >
            <MessageIcon sx={{ mr: 1 }} />
            チャットメッセージ
          </Typography>

          <List sx={{ mb: 2, p: 0 }}>
            {events.length === 0 ? (
              <ListItem alignItems="flex-start" sx={{ px: 0, mb: 3 }}>
                <Card
                  sx={{
                    width: '100%',
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    minHeight: '200px', // 最小の高さを設定
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                      まだメッセージがありません。最初のメッセージを投稿しましょう！
                    </Typography>
                  </CardContent>
                </Card>
              </ListItem>
            ) : (
              events.map((event) => (
                <ListItem key={event.id} alignItems="flex-start" sx={{ px: 0, mb: 3 }}>
                  <Card
                    sx={{
                      width: '100%',
                      borderRadius: 2,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      minHeight: '200px', // 最小の高さを設定
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
                        <Avatar
                          sx={{
                            mr: 2,
                            bgcolor: 'primary.main',
                            width: 48,
                            height: 48,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                          }}
                        >
                          <PersonIcon />
                        </Avatar>
                        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
                              {event.pubkey.slice(0, 8)}...
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                bgcolor: 'rgba(0, 0, 0, 0.04)',
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 10
                              }}
                            >
                              {event.created_at ? new Date(event.created_at * 1000).toLocaleString() : '日時不明'}
                            </Typography>
                          </Box>

                          <Typography
                            variant="body1"
                            component="div"
                            sx={{
                              whiteSpace: 'pre-wrap',
                              my: 2,
                              lineHeight: 1.6,
                              color: 'text.primary',
                              flexGrow: 1, // 可変領域として拡大
                              minHeight: '80px' // 最小の高さを設定
                            }}
                          >
                            {event.content}
                          </Typography>

                          <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 2,
                            pt: 2,
                            borderTop: '1px solid',
                            borderColor: 'divider'
                          }}>
                            <Tooltip title={`ID: ${event.id}`}>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                  cursor: 'pointer',
                                  fontFamily: 'monospace',
                                  bgcolor: 'rgba(0, 0, 0, 0.04)',
                                  px: 1,
                                  py: 0.5,
                                  borderRadius: 1
                                }}
                              >
                                #{event.id.slice(0, 8)}
                              </Typography>
                            </Tooltip>

                            <Box>
                              <PublishReactionToChannel event={event} />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </ListItem>
              ))
            )}
          </List>
        </Box>



      </Paper>
    </Container>
  );
};
