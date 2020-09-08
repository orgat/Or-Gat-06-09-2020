import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './favoritesStyles';
import API from '../../assets/api';

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

  render() {
    console.log(this.state.favoritesData);
    return <div></div>;
  }
}

export default withStyles(styles)(Favorites);
