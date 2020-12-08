const request = require('request');
const {
    getRedBkg
} = require('./logging');

const geocode = (search, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=pk.eyJ1IjoibWlvYW5hIiwiYSI6ImNraWJ0eWs2azEycnEydHJzYWs5ODlyZWoifQ.zdhrVuoPnrKifyY3n4GKWA&limit=1`;

    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            return callback(`Unable to connect to geocode service.\n${getRedBkg(error)}`);
        }

        const result = body.features[0];

        if (!result) {
            return callback(`No result found for searched term.`);
        }

        const { center, place_name: location } = result;

        callback(undefined, {
            lng: center[0],
            lat: center[1],
            location
        })
    });

};

module.exports = {
    geocode
};