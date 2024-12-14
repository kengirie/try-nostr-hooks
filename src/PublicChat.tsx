import { useEffect } from 'react';
import { useSubscription } from 'nostr-hooks';
import { useParams } from 'react-router-dom';
import PublishReactionToChannel from './PublishReactionToChannel';
import PublishChatComment from './PublishChatComment';

const PublicChat = () => {
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

  reacts.map((event) => {
    console.log(event);
  });
  return (
    <ul>
      {abouts.map((about) => (
        <li key={about.id}>
          <h2>{about.content}</h2>
        </li>
      ))}
      <PublishReactionToChannel event={abouts[0]} />
      <PublishChatComment event={abouts[0]} />
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
