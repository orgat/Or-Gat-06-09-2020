export default (theme) => ({
  mainContainer: {
    padding: 20,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',

    '@media (max-width: 810px)': {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },

  weatherCardWrapper: {
    marginRight: 20,
    '@media (max-width: 810px)': {
      marginRight: 0,
      marginBottom: 20,
    },
  },
  logoContainer: {
    position: 'fixed',
    bottom: 10,
    left: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    '&:visited': {
      color: 'inherit',
    },
  },
  logoImage: {
    height: 'auto',
    width: 'auto',
    maxHeight: 60,
    color: '#fff',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    '@media (max-width: 700px)': {
      maxHeight: 40,
    },
  },
  attribution: {
    fontSize: 10,
    marginBottom: 5,
    '@media (max-width: 700px)': {
      fontSize: 8,
      fontWeight: 'bold',
    },
  },
});
