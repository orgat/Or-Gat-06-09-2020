import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import WeatherCard from '../WeatherCard/WeatherCard';
import styles from './homeStyles';
import WeatherCardSmall from '../WeatherCardSmall/WeatherCardSmall';

const useStyles = makeStyles(styles);

function Home(props) {
  const {
    autocompleteSuggestions,
    hourlyForecast,
    weeklyForecast,
    selectedLocation,
    handleOptionSelection,
    handleInputChange,
  } = props;
  console.log(props);
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <div className={classes.autocompleteContainer}>
        <Autocomplete
          options={autocompleteSuggestions}
          getOptionLabel={(option) =>
            `${option.LocalizedName}, ${option.Country.LocalizedName}`
          }
          onInputChange={handleInputChange}
          onChange={handleOptionSelection}
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
      {selectedLocation && hourlyForecast && weeklyForecast && (
        <Fragment>
          <div className={classes.weatherCardContainer}>
            <WeatherCard
              locationData={selectedLocation}
              forecast={hourlyForecast}
            />
          </div>

          <div className={classes.separator}></div>

          <div className={classes.weeklyTitleContainer}>
            <h2 className={classes.weeklyTitle}>This week:</h2>
          </div>
          <div className={classes.weeklyWeatherContainer}>
            {weeklyForecast.DailyForecasts.map((entry, index) => {
              return <WeatherCardSmall key={index} forecast={entry} />;
            })}
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default Home;
