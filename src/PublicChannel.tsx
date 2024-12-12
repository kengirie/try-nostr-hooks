import { useEffect } from 'react';
import { useSubscription } from 'nostr-hooks';
import PublicChat from './PublicChat';

const PublicChannel = () => {
  //const subId = `${pubkey}-notes`;

  const { events, isLoading, createSubscription, removeSubscription } = useSubscription('32');

  useEffect(() => {
    console.log();

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
      {events.map((event) => (
        <li key={event.id}>
          <h3>{event.id}</h3>
          <p>{event.tags}</p>
          <p>{event.content}</p>
          <PublicChat id={event.id} />
        </li>))}
    </ul>
  );
};

export default PublicChannel;
