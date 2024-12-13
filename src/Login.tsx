import { useLogin, useNdk } from 'nostr-hooks';
import ActiveUser from './ActiveUser';
const Login = () => {
  const { setSigner } = useNdk();

  const {
    loginWithExtension,
    loginWithRemoteSigner,
    loginWithPrivateKey,
    loginFromLocalStorage,
    logout,
  } = useLogin();
    const handleLogin = () => {
    loginWithExtension({
      onError: (err) => {
        console.error('Login failed:', err);
      },
      onSuccess: (signer) => {
        console.log('Login successful:', signer);
        setSigner(signer);
      },
    });
    };

  return (
    <>
      <button onClick={handleLogin}>Login with Extension</button>
      <button onClick={() => loginWithRemoteSigner()}>Login with Remote Signer</button>
      <button onClick={() => loginWithPrivateKey()}>Login with Secret Key</button>
      <button onClick={() => loginFromLocalStorage()}>Login from Local Storage</button>
      <button onClick={() => logout()}>Logout</button>
      <ActiveUser />
    </>
  );
};

export default Login;
