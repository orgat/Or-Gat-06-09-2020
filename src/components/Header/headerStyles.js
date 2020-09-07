export default (theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10,
  },

  switchContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  switchLabel: {
    marginRight: 5,
  },
  appBar: {
    backgroundColor: theme.palette.type === 'dark' ? '#222' : null,
    color: theme.palette.type === 'dark' ? '#fff' : null,
  },
});
