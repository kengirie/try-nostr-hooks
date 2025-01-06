import { useEffect } from 'react';
import { useSubscription } from 'nostr-hooks';
import { useParams } from 'react-router-dom';
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

export const Reactions = () => {
  const { id } = useParams<{ id: string }>();
  const subIdLikes = `${id}-likes`;

  const { events: reacts, isLoading: isReactLoading, createSubscription: createReactSubscription, removeSubscription: removeReactSubscription } = useSubscription(subIdLikes);



  useEffect(() => {
    if (!id) return;
    const filters = [{ kinds: [7], limit: 10, '#e':[id] }];
    createReactSubscription(filters);
    return () => {
      removeReactSubscription();
    };

  }, [id, createReactSubscription, removeReactSubscription]);



  if (isReactLoading) return <p>Loading...</p>;

  if (!reacts) return <p>No events found</p>;

  reacts.map((react) => console.log(react.pubkey));

  return (
    <Box>
        <Typography variant="h6" component="div" gutterBottom>
        Number of Reactions ({reacts.length})
      </Typography>
      {/* <List>
        {reacts.map((react) => (
          <ListItem key={react.id} alignItems="flex-start">
            {/* <ListItemAvatar>
              <Avatar alt="User Avatar" src={`https://robohash.org/${react.pubkey}.png`} />
            </ListItemAvatar> }
            <ListItemText
              primary={
                <Typography variant="body1" component="span">
                  {react.content}
                </Typography>
              }
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  color="textSecondary"
                >
                  {react.pubkey}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List> */}
    </Box>


  );
};

