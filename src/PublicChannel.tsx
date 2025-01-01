import { useEffect } from 'react';
import { useSubscription } from 'nostr-hooks';
import { Link, } from 'react-router-dom';
import { Typography, ListItem, ListItemText, Button } from '@mui/material';
import CreatePublicChannel from './components/CreatePublicChannel';

const PublicChannel = () => {
  //const subId = `${pubkey}-notes`;

  const { events, isLoading, createSubscription, removeSubscription } = useSubscription('32');

  useEffect(() => {

    const filters = [{ kinds: [40], limit: 10 }];

    createSubscription(filters);

    return () => {
      removeSubscription();
    };
  }, [createSubscription, removeSubscription]);

  if (isLoading) return <p>Loading...</p>;

  if (!events) return <p>No events found</p>;

  events.map((event) => {
    console.log(event);
  });

  return (
    <ul>
      <CreatePublicChannel />
    {events.map((event) => {
        let content;
        try {
          content = JSON.parse(event.content);
        } catch (e) {
          console.error('Failed to parse event content', e);
          content = { name: 'Unknown', about: 'Unknown' };
        }

        return (
            <ListItem key={event.id} alignItems="flex-start">
              <ListItemText
                primary={
                  <Typography variant="h6" component="span">
                    Name: {content.name}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textSecondary"
                    >
                      ID: {event.id}
                    </Typography>
                    <Typography variant="body2">
                      About: {content.about}
                    </Typography>
                  </>
                }
              />
              <Button component={Link} to={`/channel/${event.id}`} variant="contained" color="secondary">
                Chat
              </Button>
            </ListItem>
        );
      })}
    </ul>
  );
};

export default PublicChannel;
