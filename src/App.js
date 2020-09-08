import React, { Component } from 'react';
import Main from './components/Main/Main';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  state = {
    isDarkMode: false,
  };

  componentDidMount() {
    if (localStorage.getItem('darkMode')) {
      const isDarkMode =
        localStorage.getItem('darkMode') === 'true' ? true : false;
      this.setState({ isDarkMode });
    }
  }

  toggleDarkMode = () => {
    this.setState((prevState) => {
      // Set value in localstorage
      localStorage.setItem('darkMode', !prevState.isDarkMode);

      return { isDarkMode: !prevState.isDarkMode };
    });
  };

  render() {
    const { isDarkMode } = this.state;
    return (
      <div className='app'>
        <ThemeProvider theme={getTheme(isDarkMode)}>
          <CssBaseline />
          <Main toggleDarkMode={this.toggleDarkMode} isDarkMode={isDarkMode} />
        </ThemeProvider>
      </div>
    );
  }
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
