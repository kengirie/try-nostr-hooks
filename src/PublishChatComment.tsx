import { NDKEvent ,NDKTag} from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import {useState} from 'react';

export const PublishChatComment = ({ event }: { event: NDKEvent }) => {
    const [content, setContent] = useState('');

  const { ndk } = useNdk();

  const handlePublish = () => {
    const eventReaction = new NDKEvent(ndk);
    eventReaction.content = content;
    const tags: NDKTag[] = [
      ['e', event.id, "root"]
    ]
    eventReaction.tags = tags;
    eventReaction.kind = 42;
    eventReaction.publish();
  };

  return (
    <>
         <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={() => handlePublish()}>comment</button>
    </>
  );
};
