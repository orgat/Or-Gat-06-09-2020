import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './weatherCardSmallStyles.js';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { getDayName } from '../../helpers/dateFormatter';

class WeatherCardSmall extends Component {
  render() {
    const { classes, forecast } = this.props;

    const images = importAll(
      require.context('../../assets/img', false, /\.(png|jpe?g|svg)$/)
    );

    return (
      <Card className={classes.cardRoot}>
        <CardContent className={classes.cardContent}>
          <Typography variant='h4'>{getDayName(forecast.Date)}</Typography>
          <br></br>
          <img src={images[`icon${forecast.Day.Icon}.png`]}></img>
          <br></br>
          <Typography variant='h3' className={classes.textShadow}>
            {forecast.Temperature.Maximum.Value + '˚c'}
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

export default withStyles(styles)(WeatherCardSmall);
