import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import WeatherCard from '../WeatherCard/WeatherCard';
import styles from './homeStyles';
import WeatherCardSmall from '../WeatherCardSmall/WeatherCardSmall';

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
];

export class Home extends Component {
  onInputChange = (e) => {
    clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(() => {}, 1500);
  };
  render() {
    const { classes } = this.props;

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <div style={{ marginTop: 25 }}>
          <Autocomplete
            id='combo-box-demo'
            options={top100Films}
            getOptionLabel={(option) => option.title}
            onInputChange={this.onInputChange}
            className={classes.inputField}
            renderInput={(params) => (
              <TextField
                {...params}
                className={classes.inputLabel}
                label='Search a location'
                variant='outlined'
              />
            )}
          />
        </div>
        <div style={{ marginTop: 50 }}>
          <WeatherCard />
        </div>
        <div style={{ marginTop: 50, width: '80%', textAlign: 'left' }}>
          <h2 style={{ fontStyle: 'italic', color: '#555' }}>Upcoming week:</h2>
        </div>
        <div className={classes.weeklyWeatherContainer}>
          <WeatherCardSmall />
          <WeatherCardSmall />
          <WeatherCardSmall />
          <WeatherCardSmall />
          <WeatherCardSmall />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
