import { useActiveUser } from 'nostr-hooks';
import { useProfile } from 'nostr-hooks';
import './ActiveUser.css';
const ActiveUser = () => {
  const { activeUser } = useActiveUser();
  const { profile } = useProfile({ pubkey: activeUser?.pubkey });

  if (activeUser === undefined) return <p>Loading... your account</p>;

  if (activeUser === null) return <p>Not logged in</p>;

  return (
    <>
      {profile?.image && <img src={profile.image} alt="Profile" className="profile-image"/>}
      <p>{profile?.displayName}</p>
    </>
  );
};
export default ActiveUser;
