import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContextProvider } from './hooks/useStateContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material/';

const root = ReactDOM.createRoot(document.getElementById('root'));
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#ff4400',
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      contrastText: '#ffcc00',
    },
  },
  typography: {
    fontFamily: '"IBM Plex Sans"'
  }
})

root.render(
  <React.StrictMode>
    <ContextProvider>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ContextProvider>
  </React.StrictMode>
);
