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
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    '@media (max-width: 1380px)': {
      flexWrap: 'wrap',
    },
  },
  separator: {
    width: '95%',
    height: 2,
    backgroundColor: '#ddd',
    marginTop: 30,
  },
  weeklyTitleContainer: { marginTop: 15, width: '80%', textAlign: 'left' },
  weeklyTitle: { fontStyle: 'italic', color: '#555' },
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  weatherCardContainer: { marginTop: 20 },
  autocompleteContainer: { marginTop: 15 },
  circularProgress: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
