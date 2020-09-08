export default (theme) => ({
  mainContainer: {
    padding: 20,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',

    '@media (max-width: 810px)': {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },

  weatherCardWrapper: {
    marginRight: 20,
    marginBottom: 20,
    '@media (max-width: 810px)': {
      marginRight: 0,
      marginBottom: 20,
    },
  },
});
