import { useState, useEffect } from 'react'
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'
import { useNdk } from 'nostr-hooks';
import PublicChannel from './PublicChannel';
import PublicChat from './PublicChat';

import NDK from "@nostr-dev-kit/ndk";
import About from './About';
import Header from './Header';

     const firstndk = new NDK({
       explicitRelayUrls: ["wss://nos.lol"],
     });


function App() {

  const { initNdk, ndk } = useNdk();
  useEffect(() => {
    initNdk(
      firstndk);
  }, [initNdk]);

  useEffect(() => {
    ndk?.connect(); // This will also reconnect when the instance changes
  }, [ndk]);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/channel" element={<PublicChannel></PublicChannel>} />
          <Route path="/about" element={<About />} />
          <Route path="/channel/:id" element={<PublicChat />} />
      </Routes>
      </Router>
    </>

  )
}

export default App
