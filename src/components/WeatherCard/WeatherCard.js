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
import { useSelector, useDispatch } from 'react-redux';
import types from '../../redux/types';

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

  const favoriteForecasts = useSelector((state) => state.favoriteForecasts);
  const dispatch = useDispatch();

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

    favoriteForecasts.forEach((location) => {
      if (location.locationKey === locationData.locationKey) {
        isFavorite = true;
      }
    });

    setIsFavorite(isFavorite);
  }, [favoriteForecasts, locationData.locationKey]);

  const handleFavoriteIconClick = useCallback(
    (e) => {
      e.stopPropagation();

      let newFavorites = [];

      // Remove from favorites if it already is
      if (isFavorite) {
        newFavorites = favoriteForecasts.filter(
          (location) => location.locationKey !== locationData.locationKey
        );
      } else {
        // Add to favorites
        newFavorites = favoriteForecasts.slice();
        newFavorites.push(locationData);
      }

      localStorage.setItem('favorites', JSON.stringify(newFavorites));

      dispatch({ type: types.SET_FAVORITE_FORECASTS, payload: newFavorites });

      setIsFavorite((isFavorite) => !isFavorite);

      // Call hook callback function
      if (typeof onFavoriteIconClick === 'function') {
        onFavoriteIconClick(locationData.locationKey);
      }
    },
    [onFavoriteIconClick, locationData, isFavorite, dispatch, favoriteForecasts]
  );

  const handleCardClick = useCallback(() => {
    if (typeof onWeatherCardClick === 'function') {
      onWeatherCardClick(locationData);
    }
  }, [onWeatherCardClick, locationData]);

  const cardStyle = props.clickable ? { cursor: 'pointer' } : null;

  return (
    <Card
      className={classes.cardRoot}
      onClick={handleCardClick}
      style={cardStyle}>
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
