import React, { useCallback, Fragment } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import Home from '../Home/Home';
import Favorites from '../Favorites/Favorites';
import Header from '../Header/Header';
import styles from './mainStyles';
import accuweatherLogo from '../../assets/img/accuweather_logo.png';
import accuweatherLogoDark from '../../assets/img/accuweather_logo_dark.png';
import types from '../../redux/types';

const useStyles = makeStyles(styles);

function Main(props) {
  const classes = useStyles();
  const theme = useTheme();

  const selectedTabIndex = useSelector((state) => state.selectedTabIndex);
  const dispatch = useDispatch();

  const handleTabChange = useCallback(
    (e, newIndex) => {
      dispatch({ type: types.SET_SELECTED_TAB_INDEX, payload: newIndex });
    },
    [dispatch]
  );

  return (
    <Fragment>
      <Header
        handleTabChange={handleTabChange}
        selectedTabIndex={selectedTabIndex}
      />
      {0 === selectedTabIndex && <Home />}
      {1 === selectedTabIndex && <Favorites />}

      <a className={classes.logoContainer} href='http://www.accuweather.com/'>
        <span className={classes.attribution}>Powered by</span>
        <img
          alt='accuweather-logo'
          className={classes.logoImage}
          src={
            theme.palette.type === 'dark'
              ? accuweatherLogoDark
              : accuweatherLogo
          }></img>
      </a>
    </Fragment>
  );
}

export default Main;
