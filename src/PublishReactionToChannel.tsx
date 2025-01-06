import { NDKEvent ,NDKTag} from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';

export const PublishReactionToChannel = ({event}:{event: NDKEvent}) => {

  const { ndk } = useNdk();

  const handlePublish = () => {
    const eventReaction = new NDKEvent(ndk);
    eventReaction.content = "+";
    const tags: NDKTag[] = [
      ['e', event.id],
      ['p', event.pubkey]
    ]
    eventReaction.tags = tags;
    eventReaction.kind = 7;
    eventReaction.publish();
  };

  return (
    <>
      <button onClick={() => handlePublish()}>good</button>
    </>
  );
};
