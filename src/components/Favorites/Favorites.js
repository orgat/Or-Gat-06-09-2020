import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import styles from './favoritesStyles';
import API from '../../assets/api';
import WeatherCard from '../WeatherCard/WeatherCard';
import types from '../../redux/types';

const useStyles = makeStyles(styles);

function Favorites(props) {
  const [favoritesData, setFavoritesData] = useState(null);

  const favoriteForecasts = useSelector((state) => state.favoriteForecasts);

  const classes = useStyles();
  const disaptch = useDispatch();

  const fetchHourlyForecast = useCallback((locationKey) => {
    const { hourlyForecastBaseUrl: baseUrl, key } = API;

    return fetch(`${baseUrl}/${locationKey}?apikey=${key}&metric=true`);
  }, []);

  const loadFavorites = useCallback(async () => {
    const favoritesData = [];

    try {
      let promises = [];
      for (let i = 0; i < favoriteForecasts.length; i++) {
        promises[i] = fetchHourlyForecast(favoriteForecasts[i].locationKey);
      }

      const responses = await Promise.all(promises);

      for (let i = 0; i < responses.length; i++) {
        let json = await responses[i].json();
        favoritesData.push({ location: favoriteForecasts[i], data: json });
      }

      setFavoritesData(favoritesData);
    } catch (err) {
      console.error(err);
    }
  }, [fetchHourlyForecast, favoriteForecasts]);

  useEffect(() => {
    loadFavorites();
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

  const onFavoriteCardClick = useCallback(
    (location) => {
      // Switch to Home tab
      disaptch({ type: types.SET_SELECTED_TAB_INDEX, payload: 0 });

      // Set selected location to the clicked location
      disaptch({ type: types.SET_SELECTED_LOCATION, payload: location });
    },
    [disaptch]
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
                clickable={true}
              />
            </div>
          );
        })}
    </div>
  );
}

export default Favorites;
