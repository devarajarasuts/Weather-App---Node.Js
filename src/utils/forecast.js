const request = require('request');

const getForecast = (latitude, longitude, callback) => {

const url = `https://api.darksky.net/forecast/62dfe52c22790011dc9c0a446ed37cf5/${latitude}, ${longitude}`

request(url, {json: true}, (error, {body} ) => {
    if(error) {
        callback('Unable to reach Location - Connection ERROR!',  undefined);
    }else if(body.error){
        callback('Invalid Latitude and Longitude',  undefined);
    }else {
        const summary = body.daily.data[0].summary;
        const temperature = body.currently.temperature;
        const precipProbability = body.currently.precipProbability;
        callback(undefined, {summary, temperature, precipProbability});
    }
})

};

module.exports = getForecast;