import React, {
  Fragment,
  useCallback,
  useRef,
  useEffect,
  useState,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Snackbar, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Alert from '@material-ui/lab/Alert';
import WeatherCard from '../WeatherCard/WeatherCard';
import styles from './homeStyles';
import WeatherCardSmall from '../WeatherCardSmall/WeatherCardSmall';
import API from '../../assets/api';
import types from '../../redux/types';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles(styles);

function Home(props) {
  const classes = useStyles();

  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState(null);
  const [errorToast, setErrorToast] = useState({ isOpen: false, message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const selectedLocation = useSelector((state) => state.selectedLocation);
  const dispatch = useDispatch();

  const typingTimeout = useRef(null);

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
    const { weeklyForecastBaseUrl: baseUrl, key } = API;

    const response = await fetch(
      `${baseUrl}/${locationKey}?apikey=${key}&metric=true`
    );

    if (!response.ok) {
      throw Error();
    }

    const json = await response.json();

    setWeeklyForecast(json);
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

  useEffect(() => {
    setIsLoading(true);
    getAllForecasts(selectedLocation.locationKey).then(() =>
      setIsLoading(false)
    );
  }, [selectedLocation]);

  const fetchAutocompleteResults = useCallback(async (query) => {
    const { autocompleteBaseUrl: baseUrl, key } = API;

    try {
      const response = await fetch(`${baseUrl}?apikey=${key}&q=${query}`);

      if (!response.ok) {
        throw Error();
      }

      const json = await response.json();

      setAutocompleteSuggestions(json);
    } catch (err) {
      console.error(err);
      setErrorToast({
        isOpen: true,
        message: 'Service is currently unavailable',
      });
    }
  }, []);

  const handleToastClose = useCallback(
    () => setErrorToast({ isOpen: false, message: '' }),
    []
  );

  const handleInputChange = useCallback(
    (e, newInputValue) => {
      // Clear last timeout
      clearTimeout(typingTimeout.current);

      // Set a timeout to minimize http requests to API
      typingTimeout.current = setTimeout(
        () => fetchAutocompleteResults(newInputValue),
        500
      );
    },
    [fetchAutocompleteResults]
  );

  const handleOptionSelection = useCallback(
    async (e, newValue) => {
      if (!newValue) {
        return;
      }

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

      setIsLoading(true);

      getAllForecasts(selectedLocation.locationKey).then(() =>
        setIsLoading(false)
      );

      dispatch({
        type: types.SET_SELECTED_LOCATION,
        payload: selectedLocation,
      });
    },
    [getAllForecasts, dispatch]
  );

  return (
    <div className={classes.mainContainer}>
      <div className={classes.autocompleteContainer}>
        <Autocomplete
          options={autocompleteSuggestions}
          getOptionLabel={(option) =>
            `${option.LocalizedName}, ${option.Country.LocalizedName}`
          }
          onInputChange={handleInputChange}
          onChange={handleOptionSelection}
          className={classes.inputField}
          renderInput={(params) => (
            <TextField
              {...params}
              className={classes.inputLabel}
              label='Search a location'
              variant='outlined'
            />
          )}
        />
      </div>
      {selectedLocation && hourlyForecast && weeklyForecast && (
        <Fragment>
          <div className={classes.weatherCardContainer}>
            <WeatherCard
              locationData={selectedLocation}
              forecast={hourlyForecast}
            />
          </div>

          <div className={classes.separator}></div>

          <div className={classes.weeklyTitleContainer}>
            <h2 className={classes.weeklyTitle}>This week:</h2>
          </div>
          <div className={classes.weeklyWeatherContainer}>
            {weeklyForecast.DailyForecasts.map((entry, index) => {
              return <WeatherCardSmall key={index} forecast={entry} />;
            })}
          </div>
        </Fragment>
      )}
      <Snackbar
        open={errorToast.isOpen}
        autoHideDuration={10000}
        onClose={handleToastClose}>
        <Alert severity='error'>{errorToast.message}</Alert>
      </Snackbar>
      {isLoading && <CircularProgress className={classes.circularProgress} />}
    </div>
  );
}

export default Home;
