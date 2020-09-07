export default (theme) => ({
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },

  inputField: {
    width: 380,
    '@media (max-width: 400px)': {
      width: 300,
    },
  },
  weeklyWeatherContainer: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    '@media (max-width: 1380px)': {
      flexWrap: 'wrap',
    },
  },
});
