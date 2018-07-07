const getWeatherIconName = (iconValue) => {
  if (iconValue === '01d') {
    return 'ios-sunny';
  } else if (iconValue === '01n') {
    return 'ios-moon';
  } else if (iconValue === '02d') {
    return 'ios-partly-sunny';
  } else if (iconValue === '02n') {
    return 'ios-cloudy-night';
  } else if (iconValue === '03d' || iconValue === '03n') {
    return 'ios-cloud';
  } else if (iconValue === '04d' || iconValue === '04n') {
    return 'md-rainy';
  } else if (iconValue === '09d' || iconValue === '09n' || iconValue === '10d' || iconValue === '10n') {
    return 'ios-rainy';
  } else if (iconValue === '11d' || iconValue === '11n') {
    return 'ios-thunderstorm';
  } else if (iconValue === '13d' || iconValue === '13n') {
    return 'md-snow';
  } else if (iconValue === '50d' || iconValue === '50n') {
    return 'ios-snow-outline';
  }
  return 'ios-cloud';
};

export default getWeatherIconName;
