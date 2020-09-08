import React, { Component } from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import styles from './favoritesStyles';
import API from '../../assets/api';
import WeatherCard from '../WeatherCard/WeatherCard';

import accuweatherLogo from '../../assets/img/accuweather_logo.png';
import accuweatherLogoDark from '../../assets/img/accuweather_logo_dark.png';

class Favorites extends Component {
  state = {
    favoritesData: null,
  };

  componentDidMount() {
    this.loadFavorites();
  }

  loadFavorites = async () => {
    if (localStorage.getItem('favorites')) {
      const favoriteLocations = JSON.parse(localStorage.getItem('favorites'));
      const favoritesData = [];

      try {
        let promises = [];
        for (let i = 0; i < favoriteLocations.length; i++) {
          promises[i] = this.fetchHourlyForecast(
            favoriteLocations[i].locationKey
          );
        }

        const responses = await Promise.all(promises);

        for (let i = 0; i < responses.length; i++) {
          let json = await responses[i].json();
          favoritesData.push({ location: favoriteLocations[i], data: json });
        }

        this.setState({ favoritesData });
      } catch (err) {
        console.error(err);
      }
    }
  };

  fetchHourlyForecast = (locationKey) => {
    const { hourlyForecastBaseUrl: baseUrl, key } = API;

    return fetch(`${baseUrl}/${locationKey}?apikey=${key}&metric=true`);
  };

  handleFavoriteIconClick = (locationKey) => {
    const { favoritesData } = this.state;

    const newFavoritesData = favoritesData.filter((entry) => {
      return entry.location.locationKey !== locationKey;
    });

    this.setState({ favoritesData: newFavoritesData });
  };

  render() {
    const { classes, theme } = this.props;
    const { favoritesData } = this.state;

    return (
      <div className={classes.mainContainer}>
        {favoritesData &&
          favoritesData.map((entry, index) => {
            return (
              <div key={index} className={classes.weatherCardWrapper}>
                <WeatherCard
                  locationData={entry.location}
                  forecast={entry.data[0]}
                  onFavoriteIconClick={this.handleFavoriteIconClick}
                />
              </div>
            );
          })}
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
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Favorites);
