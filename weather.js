const request = require('request')
const API_KEY = ''

let getWeather = (location, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${API_KEY}/${location.lat},${location.lng}?units=auto`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback("Unable to connect to Forecast.io")
        } else if (response.code === 400) {
            callback("Invalid format")
        } else {
            callback(undefined, body.currently)
        }
    })
}

module.exports = { getWeather }
