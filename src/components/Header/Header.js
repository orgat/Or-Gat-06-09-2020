import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Toolbar, Switch } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import styles from './headerStyles';
import types from '../../redux/types';

const useStyles = makeStyles(styles);

function Header(props) {
  const { handleTabChange, selectedTabIndex } = props;

  const isDarkMode = useSelector((state) => state.isDarkMode);
  const dispatch = useDispatch();

  const classes = useStyles();

  const toggleDarkMode = useCallback(() => {
    const newIsDarkMode = !isDarkMode;

    localStorage.setItem('darkMode', newIsDarkMode);

    dispatch({ type: types.SET_DARK_MODE, payload: newIsDarkMode });
  }, [dispatch, isDarkMode]);

  return (
    <AppBar position='static' className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.switchContainer}>
          <Switch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            name='darkThemeSwitch'
          />
          <span className={classes.switchLabel}>Dark Mode</span>
          <Brightness4Icon />
        </div>
        <Tabs value={selectedTabIndex} onChange={handleTabChange}>
          <Tab label='Home' />
          <Tab label='Favorites' />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
