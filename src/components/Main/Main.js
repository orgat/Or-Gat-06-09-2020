import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Snackbar, CircularProgress } from '@material-ui/core';

import Home from '../Home/Home';
import Favorites from '../Favorites/Favorites';
import Header from '../Header/Header';
import styles from './mainStyles';
import API from '../../assets/api';
import Alert from '@material-ui/lab/Alert';
import accuweatherLogo from '../../assets/img/accuweather_logo.png';
import accuweatherLogoDark from '../../assets/img/accuweather_logo_dark.png';

class Main extends Component {
  state = {
    selectedTabIndex: 0,
    autocompleteSuggestions: [],
    hourlyForecast: null,
    weeklyForecast: null,
    selectedLocation: null,
    errorToast: { isOpen: false, message: '' },
  };

  componentDidMount() {
    // Check if user has already selected a location before
    if (
      localStorage.getItem('selectedLocation') &&
      this.state.selectedLocation === null
    ) {
      const selectedLocation = JSON.parse(
        localStorage.getItem('selectedLocation')
      );

      this.getAllForecasts(selectedLocation.locationKey).then(() => {
        this.setState({ selectedLocation });
      });
    } else if (
      !localStorage.getItem('selectedLocation') &&
      this.state.selectedLocation === null
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

      this.getAllForecasts(selectedLocation.locationKey).then(() => {
        // Set selected location data in state only after fetching forecast
        this.setState({ selectedLocation });
      });
    }
  }

  getAllForecasts = async (locationKey) => {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.fetchDailyForecast(locationKey),
        this.fetchWeeklyForecast(locationKey),
      ])
        .then(() => {
          resolve();
        })
        .catch((err) => {
          console.error(err);

          // Pop an error toast message
          this.setState({
            errorToast: {
              isOpen: true,
              message: 'Service is currently unavailable',
            },
          });
          resolve();
        });
    });
  };

  handleInputChange = (e, newInputValue) => {
    // Clear last timeout
    clearTimeout(this.typingTimeout);

    // Set a timeout to minimize http requests to API
    this.typingTimeout = setTimeout(
      () => this.fetchAutocompleteResults(newInputValue),
      800
    );
  };

  handleOptionSelection = async (e, newValue) => {
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
    localStorage.setItem('selectedLocation', JSON.stringify(selectedLocation));

    // Set selected location data in state only after fetching forecast
    this.getAllForecasts(selectedLocation.locationKey).then(() => {
      this.setState({ selectedLocation });
    });
  };

  handleToastClose = () =>
    this.setState({ errorToast: { isOpen: false, message: '' } });

  fetchAutocompleteResults = async (query) => {
    const { autocompleteBaseUrl: baseUrl, key } = API;

    const response = await fetch(`${baseUrl}?apikey=${key}&q=${query}`);

    if (!response.ok) {
      throw Error();
    }

    const json = await response.json();

    this.setState({ autocompleteSuggestions: json });
  };

  fetchDailyForecast = async (locationKey) => {
    const { hourlyForecastBaseUrl: baseUrl, key } = API;

    const response = await fetch(
      `${baseUrl}/${locationKey}?apikey=${key}&metric=true`
    );

    if (!response.ok) {
      throw Error();
    }

    const json = await response.json();

    this.setState({ hourlyForecast: json[0] });
  };

  fetchWeeklyForecast = async (locationKey) => {
    try {
      const { weeklyForecastBaseUrl: baseUrl, key } = API;

      const response = await fetch(
        `${baseUrl}/${locationKey}?apikey=${key}&metric=true`
      );

      if (!response.ok) {
        throw Error();
      }

      const json = await response.json();

      this.setState({ weeklyForecast: json });
    } catch (err) {
      console.error(err);

      this.setState({
        errorToast: {
          isOpen: true,
          message: 'Service is currently unavailable',
        },
      });
    }
  };

  handleTabChange = (e, newIndex) => {
    this.setState({ selectedTabIndex: newIndex });
  };

  handleFavoriteCardClick = (location) => {
    this.getAllForecasts(location.locationKey).then(() => {
      this.setState({ selectedLocation: location, selectedTabIndex: 0 });
    });
  };

  render() {
    const { classes, toggleDarkMode, isDarkMode, theme } = this.props;
    const {
      selectedTabIndex,
      errorToast,
      hourlyForecast,
      weeklyForecast,
      selectedLocation,
      autocompleteSuggestions,
    } = this.state;

    return (
      <Fragment>
        <Header
          handleTabChange={this.handleTabChange}
          selectedTabIndex={selectedTabIndex}
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />
        {0 === selectedTabIndex && (
          <Home
            handleOptionSelection={this.handleOptionSelection}
            handleInputChange={this.handleInputChange}
            autocompleteSuggestions={autocompleteSuggestions}
            hourlyForecast={hourlyForecast}
            weeklyForecast={weeklyForecast}
            selectedLocation={selectedLocation}
          />
        )}
        {1 === selectedTabIndex && (
          <Favorites onFavoriteCardClick={this.handleFavoriteCardClick} />
        )}

        <Snackbar
          open={errorToast.isOpen}
          autoHideDuration={10000}
          onClose={this.handleToastClose}>
          <Alert severity='error'>{errorToast.message}</Alert>
        </Snackbar>

        {(!selectedLocation || !hourlyForecast || !weeklyForecast) && (
          <CircularProgress className={classes.circularProgress} />
        )}

        <a className={classes.logoContainer} href='http://www.accuweather.com/'>
          <span className={classes.attribution}>Powered by</span>
          <img
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
}

export default withStyles(styles, { withTheme: true })(Main);
