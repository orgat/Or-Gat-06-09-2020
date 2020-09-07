import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Home from '../Home/Home';
import Header from '../Header/Header';
import styles from './mainStyles';

class Main extends Component {
  state = {
    selectedTabIndex: 0,
  };

  handleTabChange = (e, newIndex) => {
    this.setState({ selectedTabIndex: newIndex });
  };

  render() {
    const { classes, toggleDarkMode, isDarkMode } = this.props;
    const { selectedTabIndex } = this.state;

    return (
      <Fragment>
        <Header
          handleTabChange={this.handleTabChange}
          selectedTabIndex={selectedTabIndex}
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />
        {0 === selectedTabIndex && <Home />}
        {1 === selectedTabIndex && <div>Favorites</div>}
      </Fragment>
    );
  }
}

export default withStyles(styles)(Main);
