import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './weatherCardSmallStyles.js';
import { Card, CardContent, Typography } from '@material-ui/core';
import { getDayName } from '../../helpers/dateFormatter';

const useStyles = makeStyles(styles);

const images = importAll(
  require.context('../../assets/img', false, /\.(png|jpe?g|svg)$/)
);

function WeatherCardSmall(props) {
  const classes = useStyles();
  const { forecast } = props;

  return (
    <Card className={classes.cardRoot}>
      <CardContent className={classes.cardContent}>
        <Typography variant='h4'>{getDayName(forecast.Date)}</Typography>
        <br></br>
        <img
          alt='weather-icon'
          src={images[`icon${forecast.Day.Icon}.png`]}></img>
        <br></br>
        <Typography variant='h3' className={classes.textShadow}>
          {forecast.Temperature.Maximum.Value + '˚c'}
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

export default WeatherCardSmall;
