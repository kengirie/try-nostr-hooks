import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useNdk, useActiveUser } from 'nostr-hooks';
import { useState } from 'react';
import { minePow } from 'nostr-tools/nip13';

const PublishNIP13 = () => {
  const [content, setContent] = useState('');
  const { ndk } = useNdk();
    const { activeUser } = useActiveUser();

  const difficulty = 4;

  if (!activeUser) return;

  const eventMined = minePow(
    {
      kind: 1,
      tags: [],
      content: 'Hello, world!',
      created_at: 0,
      pubkey: activeUser?.pubkey
    },
    difficulty,
  );
  console.log(eventMined);


  const handlePublish = () => {
    const event = new NDKEvent(ndk);
    event.content = content;
    event.kind = 1;
    event.publish();
  };

  return (
    <>
      <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />

      <button onClick={() => handlePublish()}>Publish Note</button>
    </>
  );
};
export default PublishNIP13;
