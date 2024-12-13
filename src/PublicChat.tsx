import { useEffect } from 'react';
import { useSubscription } from 'nostr-hooks';
import { useParams } from 'react-router-dom';

const PublicChat = () => {
  const { id } = useParams<{ id: string }>();
  const subId = `${id}-notes`;
  const subId2 = `${id}-likes`;

  const { events: reacts, isLoading: isReactLoading, createSubscription: createReactSubscription, removeSubscription: removeReactSubscription } = useSubscription(subId2);

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
    const filters = [{ kinds: [7], limit: 10, '#e': [id] }];
    createReactSubscription(filters);
    return () => {
      removeReactSubscription();
    };

  }, [id, createReactSubscription, removeReactSubscription]);


  if (isLoading || isReactLoading) return <p>Loading...</p>;

  if (!events || !reacts) return <p>No events found</p>;

  events.map((event) => {
    console.log(event);
  });
  return (
    <ul>
      {reacts.map((react) => (
        <li key={react.id}>
          <h3>{react.id}</h3>
          <p>{react.content}</p>
          <p>{react.pubkey}</p>
        </li>))}
      {events.map((event) => (
        <li key={event.id}>
          <h3>{event.id}</h3>
          <p>{event.pubkey}</p>
          <p>{event.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default PublicChat;
