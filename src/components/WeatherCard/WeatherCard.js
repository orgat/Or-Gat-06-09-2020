import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './weatherCardStyles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Tooltip,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { formatDate } from '../../helpers/dateFormatter';

const useStyles = makeStyles(styles);

const images = importAll(
  require.context('../../assets/img', false, /\.(png|jpe?g|svg)$/)
);

function WeatherCard(props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const {
    locationData,
    onFavoriteIconClick,
    forecast,
    onWeatherCardClick,
  } = props;
  const classes = useStyles();

  useEffect(() => {
    // Check if location is in favorites
    if (localStorage.getItem('favorites')) {
      const favorites = JSON.parse(localStorage.getItem('favorites'));

      favorites.forEach((location) => {
        if (location.locationKey === locationData.locationKey) {
          setIsFavorite(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    // Upon location update, check whether its in favorites

    let isFavorite = false;

    if (localStorage.getItem('favorites')) {
      const favorites = JSON.parse(localStorage.getItem('favorites'));
      favorites.forEach((location) => {
        if (location.locationKey === locationData.locationKey) {
          isFavorite = true;
        }
      });
    }

    setIsFavorite(isFavorite);
  }, [locationData.locationKey]);

  const handleFavoriteIconClick = useCallback(
    (e) => {
      e.stopPropagation();

      // Remove from favorites if it already is
      if (isFavorite) {
        if (localStorage.getItem('favorites')) {
          const favorites = JSON.parse(localStorage.getItem('favorites'));

          const newFavorites = favorites.filter(
            (location) => location.locationKey !== locationData.locationKey
          );

          localStorage.setItem('favorites', JSON.stringify(newFavorites));
        }
      } else {
        // Add to favorites
        let favorites = [];

        if (localStorage.getItem('favorites')) {
          favorites = JSON.parse(localStorage.getItem('favorites'));
        }

        favorites.push(locationData);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }

      setIsFavorite((isFavorite) => !isFavorite);

      // Call hook callback function
      if (typeof onFavoriteIconClick === 'function') {
        onFavoriteIconClick(locationData.locationKey);
      }
    },
    [onFavoriteIconClick, locationData, isFavorite]
  );

  const handleCardClick = useCallback(() => {
    if (typeof onWeatherCardClick === 'function') {
      onWeatherCardClick(locationData);
    }
  }, [onWeatherCardClick, locationData]);

  return (
    <Card className={classes.cardRoot} onClick={handleCardClick}>
      <CardHeader
        title={
          <div className={classes.headerTitle}>
            <Typography className={classes.textShadow} variant='h4'>
              {forecast.IconPhrase}
            </Typography>
            <img
              alt='weather-icon'
              height='80'
              src={images[`icon${forecast.WeatherIcon}.png`]}></img>
          </div>
        }
      />
      <CardContent className={classes.cardContent}>
        <Typography
          variant='h5'
          className={`${classes.textShadow} ${classes.city}`}>
          {locationData.name}
          <Tooltip
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            enterDelay={500}>
            <IconButton
              className={classes.favoriteIcon}
              style={{ color: isFavorite ? '#ff0060' : null }}
              onClick={handleFavoriteIconClick}>
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
        </Typography>
        <Typography variant='h6' className={classes.date}>
          {formatDate(forecast.DateTime)}
        </Typography>
        <br></br>
        <Typography variant='h2' className={classes.textShadow}>
          {forecast.Temperature && forecast.Temperature.Value + '˚c'}
        </Typography>
      </CardContent>
    </Card>
  );
}

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

export default WeatherCard;
