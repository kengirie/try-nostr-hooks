import { useEffect } from 'react';
import { useSubscription } from 'nostr-hooks';
import { useParams } from 'react-router-dom';

export const ChannelAbout = () => {
  const { id } = useParams<{ id: string }>();
  const subIdAbouts = `${id}-abouts`;


  const { events: abouts, isLoading: isAboutLoading, createSubscription: createAboutSubscription, removeSubscription: removeAboutSubscription } = useSubscription(subIdAbouts);


  useEffect(() => {
    if (!id) return;
    const filters = [{ kinds:[40], ids:[id] }];
    createAboutSubscription(filters);
    return () => {
      removeAboutSubscription();
    };

  }, [id, createAboutSubscription, removeAboutSubscription]);


  if (isAboutLoading) return <p>Loading...</p>;

  if (!abouts) return <p>No events found</p>;

  let aboutContent;
  try {
    aboutContent = JSON.parse(abouts[0].content);
  } catch (e) {
    console.error('Failed to parse about content', e);
  }

  return (
    <div>
      <h2>{aboutContent.name}</h2>
      <p>{aboutContent.about}</p>
      {aboutContent.picture && <img src={aboutContent.picture} alt="Channel" />}
    </div>
  );
};
