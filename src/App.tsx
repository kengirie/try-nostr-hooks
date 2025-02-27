import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery
} from '@mui/material';
import './App.css'
import { useNdk } from 'nostr-hooks';
import { PublicChannel } from './PublicChannel';
import { PublicChat } from './PublicChat';
import { Login } from './Login';
import { About } from './About';
import { Header } from './components/Header';
import { Home } from './Home';

export const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
      primary: {
        main: '#8e44ad', // 紫色
      },
      secondary: {
        main: '#2ecc71', // 緑色
      },
      background: {
        default: prefersDarkMode ? '#121212' : '#f5f5f5',
        paper: prefersDarkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: prefersDarkMode
              ? '0 4px 8px rgba(0, 0, 0, 0.5)'
              : '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
    },
  });

  const { initNdk, ndk } = useNdk();

  useEffect(() => {
    initNdk({
      explicitRelayUrls: ["wss://nos.lol"],
    });
  }, [initNdk]);

  useEffect(() => {
    ndk?.connect(); // This will also reconnect when the instance changes
  }, [ndk]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/channel" element={<PublicChannel />} />
          <Route path="/about" element={<About />} />
          <Route path="/channel/:id" element={<PublicChat />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
