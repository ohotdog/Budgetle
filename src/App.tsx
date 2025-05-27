import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Game from './components/Game';
import DebugBanner from './components/DebugBanner';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DebugBanner />
      <Game />
    </ThemeProvider>
  );
}

export default App;
