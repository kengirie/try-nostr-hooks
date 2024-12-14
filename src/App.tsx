import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import { useNdk } from 'nostr-hooks';
import PublicChannel from './PublicChannel';
import PublicChat from './PublicChat';
import Login from './Login';
import About from './About';
import Header from './Header';
import Home from './Home';


function App() {

  const { initNdk, ndk } = useNdk();
  useEffect(() => {
    initNdk({
       explicitRelayUrls: ["wss://nos.lol"],
     });
  }, [initNdk]);

  useEffect(() => {
    ndk?.connect(); // This will also reconnect when the instance changes
  }, [ndk]);
  console.log(ndk);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/channel" element={<PublicChannel></PublicChannel>} />
          <Route path="/about" element={<About />} />
          <Route path="/channel/:id" element={<PublicChat />} />
          <Route path="/login" element={<Login />} />
      </Routes>
      </Router>
    </>

  )
}

export default App
