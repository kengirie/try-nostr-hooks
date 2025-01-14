import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import './App.css'
import { useNdk } from 'nostr-hooks';
import { PublicChannel } from './PublicChannel';
import { PublicChat } from './PublicChat';
import { Login } from './Login';
import { About } from './About';
import { Header } from './components/Header';
import { Home } from './Home';


export const App = () => {

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
    // <ThemeProvider theme={darkTheme}>
    // <CssBaseline />
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/channel" element={<PublicChannel></PublicChannel>} />
        <Route path="/about" element={<About />} />
        <Route path="/channel/:id" element={<PublicChat />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
    // </ThemeProvider>

  )
};
