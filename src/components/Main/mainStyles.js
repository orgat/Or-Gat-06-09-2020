export default (theme) => ({
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
