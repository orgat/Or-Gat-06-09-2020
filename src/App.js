import React from 'react';
import Main from './components/Main/Main';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useSelector } from 'react-redux';

function App() {
  const isDarkMode = useSelector((state) => state.isDarkMode);

  return (
    <div className='app'>
      <ThemeProvider theme={getTheme(isDarkMode)}>
        <CssBaseline />
        <Main />
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
