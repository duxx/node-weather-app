const yargs = require('yargs')
const geocode = require('./geocode')
const weather = require('./weather')

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if(errorMessage) {
        console.log(errorMessage)
    } else {
        const location = {
            lat: results.latitude,
            lng: results.longitude
        }
        weather.getWeather(location, (errorMessage, results) => {
            if (errorMessage) {
                console.log(errorMessage)
            } else {
                console.log(results)
            }
        })
    }
})