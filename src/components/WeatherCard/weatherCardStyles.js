export default (theme) => {
  const cardBgColor = theme.palette.type === 'light' ? '#2196f3' : null;

  return {
    cardRoot: {
      borderRadius: 10,
      boxShadow: '3px 3px 5px 1px rgba(85,85,85,1)',
      textAlign: 'center',
      backgroundColor: cardBgColor,
      color: '#fff',
      maxWidth: 400,
      width: 375,
      '& .MuiCardHeader-action': {
        position: 'absolute',
        right: 10,
        top: 10,
      },
      '@media (max-width: 400px)': {
        width: 320,
      },
    },
    headerTitle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
    },
    date: {
      fontSize: 17,
    },
    city: {},
    textShadow: {
      textShadow: '1px 2px 2px #333',
    },
    media: {
      height: 65,
      width: 65,
    },
    favorited: {
      color: '#ff0066',
    },
    favoriteIcon: {
      position: 'absolute',
      top: '0',
      right: '0',
    },
  };
};
