const request = require('request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g&cachebuster=1555354277469&autocomplete=true&limit=1`

    request(url, {json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to Connect to location services', undefined);
        } else if(body.features.length === 0 ){
            callback('Incorrect Location used',  undefined);
        } else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const placeName = body.features[0].place_name
            callback(undefined,  {latitude, longitude, placeName});
        }
    });

}

module.exports = geoCode;