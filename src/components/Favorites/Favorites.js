import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './favoritesStyles';
import API from '../../assets/api';
import WeatherCard from '../WeatherCard/WeatherCard';

const useStyles = makeStyles(styles);

function Favorites(props) {
  const { onFavoriteCardClick } = props;

  const classes = useStyles();

  const [favoritesData, setFavoritesData] = useState(null);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = useCallback(async () => {
    if (localStorage.getItem('favorites')) {
      const favoriteLocations = JSON.parse(localStorage.getItem('favorites'));
      const favoritesData = [];

      try {
        let promises = [];
        for (let i = 0; i < favoriteLocations.length; i++) {
          promises[i] = fetchHourlyForecast(favoriteLocations[i].locationKey);
        }

        const responses = await Promise.all(promises);

        for (let i = 0; i < responses.length; i++) {
          let json = await responses[i].json();
          favoritesData.push({ location: favoriteLocations[i], data: json });
        }

        setFavoritesData(favoritesData);
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const fetchHourlyForecast = useCallback((locationKey) => {
    const { hourlyForecastBaseUrl: baseUrl, key } = API;

    return fetch(`${baseUrl}/${locationKey}?apikey=${key}&metric=true`);
  }, []);

  const handleFavoriteIconClick = useCallback(
    (locationKey) => {
      const newFavoritesData = favoritesData.filter((entry) => {
        return entry.location.locationKey !== locationKey;
      });

      setFavoritesData(newFavoritesData);
    },
    [favoritesData]
  );

  return (
    <div className={classes.mainContainer}>
      {favoritesData &&
        favoritesData.map((entry, index) => {
          return (
            <div key={index} className={classes.weatherCardWrapper}>
              <WeatherCard
                onFavoriteIconClick={handleFavoriteIconClick}
                locationData={entry.location}
                forecast={entry.data[0]}
                onWeatherCardClick={onFavoriteCardClick}
              />
            </div>
          );
        })}
    </div>
  );
}

export default Favorites;
