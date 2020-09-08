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
      animation: '$slide 0.7s ease-out',
      transition: 'top 0.5s ease-out 0s',
      '&:hover': {
        transform: 'translateY(-10px)',
      },
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

    '@keyframes slide': {
      '0%': {
        transform: 'translateY(100px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0%)',
        opacity: 1,
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
