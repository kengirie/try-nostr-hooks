import { useLogin, useNdk } from 'nostr-hooks';
const Login = () => {
  const { setSigner } = useNdk();

  const {
    loginWithExtension,
    loginWithPrivateKey,
    loginFromLocalStorage,
    logout,
  } = useLogin();
    const handleLoginWithExtension = () => {
    loginWithExtension({
      onError: (err) => {
        console.error('LoginWithExtension failed:', err);
      },
      onSuccess: (signer) => {
        console.log('LoginWithExtension successful:', signer);
        setSigner(signer);
      },
    });
    };

  return (
    <>
      <button onClick={handleLoginWithExtension}>Login with Extension</button>
      <button onClick={() => loginWithPrivateKey()}>Login with Secret Key</button>
      <button onClick={() => loginFromLocalStorage()}>Login from Local Storage</button>
      <button onClick={() => logout()}>Logout</button>
    </>
  );
};

export default Login;
