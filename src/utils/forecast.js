const request = require('request');
const {
    getRedBkg,
    getBlueBkg
} = require('./logging');

const forecast = (lat, lng, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=5872c556222d3c6655ce565284454c8b&units=f&query=${lat},${lng}`;

    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            return callback(`Unable to connect to weather service.\n${getRedBkg(error)}`);
        } else if (body.error) {
            return callback(getRedBkg(body.error.info));
        }

        const { current: currentForecast } = body;

        const concatWithDegrees = value =>
            `${value} degrees`;

        const concatWithPercent = value =>
            `${value}%`;

        // callback(
        //     undefined,
        //     `Forecast: ${getBlueBkg(currentForecast.weather_descriptions[0])}. ` +
        //     `It is currently ${getBlueBkg(concatWithDegrees(currentForecast.temperature))} out. ` +
        //     `It feels like ${getBlueBkg(concatWithDegrees(currentForecast.feelslike))} out. ` +
        //     `There is ${getRedBkg(concatWithPercent(currentForecast.precip))} chance of rain.`
        // );

        callback(
            undefined,
            `Forecast: ${currentForecast.weather_descriptions[0]}. ` +
            `It is currently ${concatWithDegrees(currentForecast.temperature)} out. ` +
            `It feels like ${concatWithDegrees(currentForecast.feelslike)} out. ` +
            `There is ${concatWithPercent(currentForecast.precip)} chance of rain.`
        );
    });
};

module.exports = {
    forecast
};