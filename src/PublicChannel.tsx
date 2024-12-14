import { useEffect } from 'react';
import { useSubscription } from 'nostr-hooks';
import { Link,} from 'react-router-dom';
import CreatePublicChannel from './CreatePublicChannel';

const PublicChannel = () => {
  //const subId = `${pubkey}-notes`;

  const { events, isLoading, createSubscription, removeSubscription } = useSubscription('32');

  useEffect(() => {
    console.log('32');

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
          <li key={event.id}>
            <h3>{event.id}</h3>
            <p>Name: {content.name}</p>
            <p>About: {content.about}</p>
            <Link to={`/channel/${event.id}`}>Chat</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default PublicChannel;
