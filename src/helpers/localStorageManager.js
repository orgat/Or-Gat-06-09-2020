export function getFavoritesOrEmptyArray() {
  if (localStorage.getItem('favorites')) {
    return JSON.parse(localStorage.getItem('favorites'));
  }

  return [];
}

export function getIsDarkMode() {
  return localStorage.getItem('darkMode') === 'true' ? true : false;
}

export function getSelectedLocationOrDefault() {
  if (localStorage.getItem('selectedLocation')) {
    const selectedLocation = JSON.parse(
      localStorage.getItem('selectedLocation')
    );

    return selectedLocation;
  }

  // Default selected location
  return {
    name: 'Tel Aviv, Israel',
    locationKey: 215793,
  };
}
