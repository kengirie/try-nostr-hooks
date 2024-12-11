import { useEffect } from 'react';
import { useSubscription } from 'nostr-hooks';

const UserNotes = ({ pubkey }: { pubkey: string | undefined }) => {
  const subId = `${pubkey}-notes`;

  const { events, isLoading, createSubscription, removeSubscription } = useSubscription(subId);

  useEffect(() => {
    if (!pubkey) return;

    const filters = [{ authors: [pubkey], kinds: [1], limit: 40 }];

    createSubscription(filters);

    return () => {
      removeSubscription();
    };
  }, [pubkey, createSubscription, removeSubscription]);

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

export default UserNotes;
