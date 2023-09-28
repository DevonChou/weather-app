const axios = require('axios');

const forecast = (latitude, longitude, callback) => {
  const accessKey = '6e3b5c191ef361f3034a2bfac660e475';
  const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${latitude},${longitude}`;

  axios
    .get(url)
    .then(({ data }) => {
      if (data.error) {
        callback('No location found!', undefined);
        return;
      }

      const {
        weather_descriptions: weather,
        temperature,
        precip,
      } = data.current;
      const weatherMsg = `${weather[0]}. It is currently ${temperature} degrees out. There is a ${precip} % chance of rain.`;

      callback(undefined, weatherMsg);
    })
    .catch(() => {
      callback('Unable to connect to weather services!', undefined);
    });
};

module.exports = forecast;
