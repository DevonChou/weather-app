const axios = require('axios');

const geocode = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json`;

  axios
    .get(url, {
      headers: {
        'User-Agent': 'weather-app/1.0 (devonchoucs@gmail.com)',
      },
    })
    .then(({ data }) => {
      if (data.length === 0) {
        callback('No location found!', undefined);
        return;
      }

      const { lat: latitude, lon: longitude, display_name: location } = data[0];
      callback(undefined, { latitude, longitude, location });
    })
    .catch(() => {
      callback('Unable to connect to location services!', undefined);
    });
};

module.exports = geocode;
