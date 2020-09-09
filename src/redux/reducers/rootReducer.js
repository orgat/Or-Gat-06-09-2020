import types from '../types';

function rootReducer(state, action) {
  switch (action.type) {
    case types.SET_DARK_MODE:
      return { ...state, isDarkMode: action.payload };

    case types.SET_FAVORITE_FORECASTS:
      return {
        ...state,
        favoriteForecasts: action.payload,
      };

    case types.SET_SELECTED_LOCATION:
      return {
        ...state,
        selectedLocation: action.payload,
      };

    case types.SET_SELECTED_TAB_INDEX:
      return {
        ...state,
        selectedTabIndex: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
