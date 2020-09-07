export default (theme) => {
  const cardBgColor = theme.palette.type === 'light' ? '#2196f3' : null;

  return {
    cardRoot: {
      borderRadius: 10,
      boxShadow: '3px 3px 5px 1px rgba(85,85,85,1)',
      textAlign: 'center',
      backgroundColor: cardBgColor,
      color: '#fff',
      width: 210,
      '@media (min-width: 1700px)': {
        width: 250,
      },

      '@media (max-width: 1380px)': {
        marginLeft: 5,
        marginTop: 10,
        width: 'calc(50% - 10px)',
      },
      '@media (max-width: 400px)': {
        width: '100%',
      },
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    city: {
      position: 'relative',
    },
    textShadow: {
      textShadow: '1px 2px 2px #333',
    },
  };
};
