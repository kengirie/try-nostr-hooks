import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useNdk } from 'nostr-hooks';
import UserNotes from './UserNotes';
import { nip19 } from "nostr-tools";
import { getPublicKey } from 'nostr-tools/pure';

import NDK from "@nostr-dev-kit/ndk";
import { NDKEvent, NDKNip07Signer, NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';
import { useLogin } from 'nostr-hooks';
import { useActiveUser } from 'nostr-hooks';
import ActiveUser from './ActiveUser';


function App() {
   const {
    loginWithExtension,
    loginWithPrivateKey,
    logout,
   } = useLogin();
  const [privateKey, setPrivateKey] = useState('');
  const [pubkey, setPubkey] = useState('');

  const handleLoginWithPrivateKey = () => {
      console.log(privateKey);
    loginWithPrivateKey({ privateKey: privateKey });
    const sk = nip19.decode(privateKey).data;
    setPubkey(getPublicKey(sk));
    console.log(pubkey);
  };


  const { initNdk, ndk } = useNdk();
    const [content, setContent] = useState('');
  useEffect(() => {
    initNdk(
      firstndk);
  }, [initNdk]);

  useEffect(() => {
    ndk?.connect(); // This will also reconnect when the instance changes
  }, [ndk]);

   const handlePublish = () => {
    const event = new NDKEvent(ndk);
    event.content = content;
    event.kind = 1;

    event.publish();
  };

  return (
    <>
       <button onClick={() => loginWithExtension()}>Login with Extension</button>
      <button onClick={() => logout()}>Logout</button>
      <ActiveUser></ActiveUser>
      <UserNotes pubkey={pubkey}></UserNotes>
          <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />

      <button onClick={() => handlePublish()}>Publish Note</button>

            <input
        type="text"
        value={privateKey}
        onChange={(e) => { setPrivateKey(e.target.value); }}
        placeholder="Enter private key"
      />
      <button onClick={() => handleLoginWithPrivateKey()}>Login with Private Key</button>
    </>

  )
}

export default App
