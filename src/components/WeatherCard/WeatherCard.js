import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
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

class WeatherCard extends Component {
  state = {
    isFavorite: false,
  };

  componentDidMount() {
    if (localStorage.getItem('favorites')) {
      const favorites = JSON.parse(localStorage.getItem('favorites'));
      favorites.forEach((location) => {
        if (location.locationKey === this.props.selectedLocation.locationKey) {
          this.setState({ isFavorite: true });
        }
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Check if location has changed
    if (
      prevProps.selectedLocation.locationKey ===
      this.props.selectedLocation.locationKey
    ) {
      return;
    }

    let isFavorite = false;

    if (localStorage.getItem('favorites')) {
      const favorites = JSON.parse(localStorage.getItem('favorites'));
      favorites.forEach((location) => {
        if (location.locationKey === this.props.selectedLocation.locationKey) {
          isFavorite = true;
        }
      });
    }

    this.setState({ isFavorite });
  }

  handleFavoriteIconClick = () => {
    let { isFavorite } = this.state;
    const { selectedLocation } = this.props;

    // Remove from favorites if it already is
    if (isFavorite) {
      if (localStorage.getItem('favorites')) {
        const favorites = JSON.parse(localStorage.getItem('favorites'));

        const newFavorites = favorites.filter(
          (location) => location.locationKey !== selectedLocation.locationKey
        );

        localStorage.setItem('favorites', JSON.stringify(newFavorites));
      }
    } else {
      // Add to favorites
      let favorites = [];

      if (localStorage.getItem('favorites')) {
        favorites = JSON.parse(localStorage.getItem('favorites'));
      }

      favorites.push(selectedLocation);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    this.setState({ isFavorite: !isFavorite });
  };

  render() {
    const { classes, hourlyForecast, selectedLocation } = this.props;
    const { isFavorite } = this.state;

    const images = importAll(
      require.context('../../assets/img', false, /\.(png|jpe?g|svg)$/)
    );

    return (
      <Card className={classes.cardRoot}>
        <CardHeader
          title={
            <div className={classes.headerTitle}>
              <Typography className={classes.textShadow} variant='h4'>
                {hourlyForecast.IconPhrase}
              </Typography>
              <img
                height='80'
                src={images[`icon${hourlyForecast.WeatherIcon}.png`]}></img>
            </div>
          }
        />
        <CardContent className={classes.cardContent}>
          <Typography
            variant='h5'
            className={`${classes.textShadow} ${classes.city}`}>
            {selectedLocation.name}
            <Tooltip title='Add location to favorites' enterDelay={500}>
              <IconButton
                className={classes.favoriteIcon}
                style={{ color: isFavorite ? '#ff0060' : null }}
                onClick={this.handleFavoriteIconClick}>
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
          </Typography>
          <Typography variant='h6' className={classes.date}>
            {formatDate(hourlyForecast.DateTime)}
          </Typography>
          <br></br>
          <Typography variant='h2' className={classes.textShadow}>
            {hourlyForecast.Temperature &&
              hourlyForecast.Temperature.Value + '˚c'}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

export default withStyles(styles)(WeatherCard);
