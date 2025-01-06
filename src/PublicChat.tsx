import { useEffect } from 'react';
import { useSubscription } from 'nostr-hooks';
import { useParams } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Card, CardContent } from '@mui/material';
import { PublishReactionToChannel } from './PublishReactionToChannel';
import { PublishChatComment } from './PublishChatComment';
import { Reactions } from './Reactions';
import { ChannelAbout } from './ChannelAbout';
import { NumberOfReactions } from './NumberOfReactions';


export const PublicChat = () => {
  const { id } = useParams<{ id: string }>();
  const subId = `${id}-chats`;
  const subIdLikes = `${id}-likes`;
  const subIdAbouts = `${id}-abouts`;

  const { events: reacts, isLoading: isReactLoading, createSubscription: createReactSubscription, removeSubscription: removeReactSubscription } = useSubscription(subIdLikes);

  const { events: abouts, isLoading: isAboutLoading, createSubscription: createAboutSubscription, removeSubscription: removeAboutSubscription } = useSubscription(subIdAbouts);

  const { events, isLoading, createSubscription, removeSubscription } = useSubscription(subId);

  useEffect(() => {

    if (!id) return () => {};

    const filters = [{ kinds: [42], limit: 10, '#e': [id] }];
    console.log(id);

    createSubscription(filters);

    return () => {
      removeSubscription();
    };
  }, [id, createSubscription, removeSubscription]);

  useEffect(() => {
    if (!id) return;
    const filters = [{ kinds: [7], limit: 10, '#e':[id] }];
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


  if (isLoading || isReactLoading || isAboutLoading) return <p>Loading...</p>;

  if (!events || !reacts || !abouts) return <p>No events found</p>;

  return (
    <ul>
      <ChannelAbout />
      <PublishReactionToChannel event={abouts[0]} />
      <PublishChatComment event={abouts[0]} />
      <Reactions />
      <NumberOfReactions />
      <List>
        {events.map((event) => (
          <ListItem key={event.id} alignItems="flex-start">
            <Card sx={{ width: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {event.content}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: {event.id}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Pubkey: {event.pubkey}
                </Typography>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </ul>
  );
};
