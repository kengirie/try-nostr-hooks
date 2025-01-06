import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { useState } from 'react';

export const CreatePublicChannel = () => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [picture, setPicture] = useState('');

  const { ndk } = useNdk();

  const handlePublish = () => {
    const event = new NDKEvent(ndk);
    event.content = JSON.stringify({ name: name, about: about, picture: picture , relays: ndk?.explicitRelayUrls});
    event.kind = 40;
    event.publish();
  };

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <input
        type="text"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        placeholder="Enter about"
      />
      <input
        type="text"
        value={picture}
        onChange={(e) => setPicture(e.target.value)}
        placeholder="Enter picture URL"
      />

      <button onClick={() => handlePublish()}>Create Channel</button>
    </>
  );
};
