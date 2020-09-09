import React, { useState, useEffect, useCallback } from 'react';
import Main from './components/Main/Main';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('darkMode')) {
      const isDarkMode =
        localStorage.getItem('darkMode') === 'true' ? true : false;

      setDarkMode(isDarkMode);
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    // Set value in localstorage
    localStorage.setItem('darkMode', !isDarkMode);

    setDarkMode((darkMode) => !darkMode);
  }, [isDarkMode]);

  return (
    <div className='app'>
      <ThemeProvider theme={getTheme(isDarkMode)}>
        <CssBaseline />
        <Main toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      </ThemeProvider>
    </div>
  );
}

function getTheme(isDarkMode) {
  const theme = createMuiTheme({
    palette: {
      type: isDarkMode ? 'dark' : 'light',
      primary: {
        main: isDarkMode ? '#fff' : '#1769aa',
      },
      secondary: {
        main: isDarkMode ? '#ff0072' : '#2196f3',
      },
    },
  });

  return theme;
}

export default App;
