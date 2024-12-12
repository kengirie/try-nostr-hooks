import { useEffect } from 'react';
import { useSubscription } from 'nostr-hooks';

const PublicChat = ({ id }: { id: string | undefined }) => {
  const subId = `${id}-notes`;

  const { events, isLoading, createSubscription, removeSubscription } = useSubscription(subId);

  useEffect(() => {
    if (!id) return;

    const filters = [{ kinds: [42], limit: 10, '#e': [id] }];

    createSubscription(filters);

    return () => {
      removeSubscription();
    };
  }, [id,createSubscription, removeSubscription]);

  if (isLoading) return <p>Loading...</p>;

  if (!events) return <p>No events found</p>;

  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>
          <h3>{event.id}</h3>
          <p>{event.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default PublicChat;
