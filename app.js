const geocode = require('./utils/geocode');
const forecastcode = require('./utils/forecastcode');

const address = process.argv[2];

if (!address) {
  console.log('Please provide an address');
} else {
  geocode(address, (error, { latitude, longitude, location }) => {
    if (error) {
      return console.log(error);
    } else {
      forecastcode(
        latitude,
        longitude,
        (
          error,
          { daily: { data }, currently: { temperature, precipProbability } }
        ) => {
          if (error) {
            return console.log(error);
          } else {
            console.log(
              location +
                '의 날씨는 ' +
                data[0].summary +
                '. 현재 온도는 ' +
                temperature +
                ' 도입니다. 강수 확률은 ' +
                precipProbability +
                '% 입니다.'
            );
          }
        }
      );
    }
  });
}
