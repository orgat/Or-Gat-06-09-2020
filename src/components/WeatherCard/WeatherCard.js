import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './weatherCardStyles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

class WeatherCard extends Component {
  render() {
    const { classes } = this.props;

    const images = importAll(
      require.context('../../assets/img', false, /\.(png|jpe?g|svg)$/)
    );

    return (
      <Card className={classes.cardRoot}>
        <CardHeader
          title={
            <div className={classes.headerTitle}>
              <Typography className={classes.textShadow} variant='h3'>
                Sunny
              </Typography>
              <img height='80' src={images['icon1.png']}></img>
            </div>
          }
        />
        <CardContent className={classes.cardContent}>
          <Typography
            variant='h4'
            className={`${classes.textShadow} ${classes.city}`}>
            Tel Aviv
            <IconButton className={classes.favoriteIcon}>
              <FavoriteIcon />
            </IconButton>
          </Typography>
          <Typography variant='h6' className={classes.date}>
            Sunday, 16 April, 2020
          </Typography>
          <br></br>
          <Typography variant='h2' className={classes.textShadow}>
            15&#730;c
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
