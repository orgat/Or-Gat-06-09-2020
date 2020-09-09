import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  Fragment,
} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Snackbar, CircularProgress } from '@material-ui/core';

import Home from '../Home/Home';
import Favorites from '../Favorites/Favorites';
import Header from '../Header/Header';
import styles from './mainStyles';
import API from '../../assets/api';
import Alert from '@material-ui/lab/Alert';
import accuweatherLogo from '../../assets/img/accuweather_logo.png';
import accuweatherLogoDark from '../../assets/img/accuweather_logo_dark.png';

const useStyles = makeStyles(styles);

function Main(props) {
  const { toggleDarkMode, isDarkMode } = props;

  const classes = useStyles();
  const theme = useTheme();

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [errorToast, setErrorToast] = useState({ isOpen: false, message: '' });
  const typingTimeout = useRef(null);

  useEffect(() => {
    // Check if user has already selected a location before
    if (localStorage.getItem('selectedLocation') && selectedLocation === null) {
      const selectedLocation = JSON.parse(
        localStorage.getItem('selectedLocation')
      );

      getAllForecasts(selectedLocation.locationKey).then(() => {
        setSelectedLocation(selectedLocation);
      });
    } else if (
      !localStorage.getItem('selectedLocation') &&
      selectedLocation === null
    ) {
      // Set location to the default of Tel-Aviv
      const selectedLocation = {
        name: 'Tel Aviv, Israel',
        locationKey: 215793,
      };
      localStorage.setItem(
        'selectedLocation',
        JSON.stringify(selectedLocation)
      );

      getAllForecasts(selectedLocation.locationKey).then(() => {
        // Set selected location data in state only after fetching forecast
        setSelectedLocation(selectedLocation);
      });
    }
  }, []);

  const fetchDailyForecast = useCallback(async (locationKey) => {
    const { hourlyForecastBaseUrl: baseUrl, key } = API;

    const response = await fetch(
      `${baseUrl}/${locationKey}?apikey=${key}&metric=true`
    );

    if (!response.ok) {
      throw Error();
    }

    const json = await response.json();

    setHourlyForecast(json[0]);
  }, []);

  const fetchWeeklyForecast = useCallback(async (locationKey) => {
    try {
      const { weeklyForecastBaseUrl: baseUrl, key } = API;

      const response = await fetch(
        `${baseUrl}/${locationKey}?apikey=${key}&metric=true`
      );

      if (!response.ok) {
        throw Error();
      }

      const json = await response.json();

      setWeeklyForecast(json);
    } catch (err) {
      console.error(err);

      setErrorToast({
        isOpen: true,
        message: 'Service is currently unavailable',
      });
    }
  }, []);

  const getAllForecasts = useCallback(
    async (locationKey) => {
      return new Promise((resolve, reject) => {
        Promise.all([
          fetchDailyForecast(locationKey),
          fetchWeeklyForecast(locationKey),
        ])
          .then(() => {
            resolve();
          })
          .catch((err) => {
            console.error(err);

            // Pop an error toast message
            setErrorToast({
              isOpen: true,
              message: 'Service is currently unavailable',
            });
            resolve();
          });
      });
    },
    [fetchDailyForecast, fetchWeeklyForecast, setErrorToast]
  );

  const handleInputChange = useCallback((e, newInputValue) => {
    // Clear last timeout
    clearTimeout(typingTimeout.current);

    // Set a timeout to minimize http requests to API
    typingTimeout.current = setTimeout(
      () => fetchAutocompleteResults(newInputValue),
      800
    );
  }, []);

  const handleOptionSelection = useCallback(
    async (e, newValue) => {
      const {
        Key: locationKey,
        LocalizedName: cityName,
        Country: { LocalizedName: countryName },
      } = newValue;

      const selectedLocation = {
        name: `${cityName}, ${countryName}`,
        locationKey,
      };

      // Save user selection in local storage
      localStorage.setItem(
        'selectedLocation',
        JSON.stringify(selectedLocation)
      );

      // Set selected location data in state only after fetching forecast
      getAllForecasts(selectedLocation.locationKey).then(() => {
        setSelectedLocation(selectedLocation);
      });
    },
    [getAllForecasts]
  );

  const handleToastClose = useCallback(
    () => setErrorToast({ isOpen: false, message: '' }),
    []
  );

  const fetchAutocompleteResults = useCallback(async (query) => {
    const { autocompleteBaseUrl: baseUrl, key } = API;

    const response = await fetch(`${baseUrl}?apikey=${key}&q=${query}`);

    if (!response.ok) {
      throw Error();
    }

    const json = await response.json();

    setAutocompleteSuggestions(json);
  }, []);

  const handleTabChange = useCallback((e, newIndex) => {
    setSelectedTabIndex(newIndex);
  }, []);

  const handleFavoriteCardClick = useCallback(
    (location) => {
      getAllForecasts(location.locationKey).then(() => {
        setSelectedLocation(location);
        setSelectedTabIndex(0);
      });
    },
    [getAllForecasts]
  );

  return (
    <Fragment>
      <Header
        handleTabChange={handleTabChange}
        selectedTabIndex={selectedTabIndex}
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
      />
      {0 === selectedTabIndex && hourlyForecast && weeklyForecast && (
        <Home
          handleOptionSelection={handleOptionSelection}
          handleInputChange={handleInputChange}
          autocompleteSuggestions={autocompleteSuggestions}
          hourlyForecast={hourlyForecast}
          weeklyForecast={weeklyForecast}
          selectedLocation={selectedLocation}
        />
      )}
      {1 === selectedTabIndex && (
        <Favorites onFavoriteCardClick={handleFavoriteCardClick} />
      )}

      <Snackbar
        open={errorToast.isOpen}
        autoHideDuration={10000}
        onClose={handleToastClose}>
        <Alert severity='error'>{errorToast.message}</Alert>
      </Snackbar>

      {(!selectedLocation || !hourlyForecast || !weeklyForecast) && (
        <CircularProgress className={classes.circularProgress} />
      )}

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
