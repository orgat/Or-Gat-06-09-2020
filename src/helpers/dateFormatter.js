const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export function formatDate(dateStr) {
  const dateObj = new Date(dateStr);
  const day = dayNames[dateObj.getDay()];
  const month = monthNames[dateObj.getMonth()];
  const date = dateObj.getDate();
  const year = dateObj.getFullYear();

  return `${day}, ${date} ${month}, ${year}`;
}

export function getDayName(dateStr) {
  const dateObj = new Date(dateStr);
  return dayNames[dateObj.getDay()];
}
