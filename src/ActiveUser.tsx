import { useActiveUser } from 'nostr-hooks';
import { useProfile } from 'nostr-hooks';

const ActiveUser = () => {
  const { activeUser } = useActiveUser();
  const { profile } = useProfile({ pubkey: activeUser?.pubkey });

  if (activeUser === undefined) return <p>Loading... your account</p>;

  if (activeUser === null) return <p>Not logged in</p>;

  return (
    <div>
      <p>{profile?.displayName}</p>
      <p>{profile?.about}</p>
    </div>
  );
};
export default ActiveUser;
