const yargs = require('yargs')
const axios = require('axios')
const GEOCODE_API_KEY = ''
const WEATHER_API_KEY = ''

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

const URIaddress = encodeURIComponent(argv.address)

axios
    .get(`http://www.mapquestapi.com/geocoding/v1/address?key=${GEOCODE_API_KEY}&location=${URIaddress}`)
    .then((response) => {
        let latitude = response.data.results[0].locations[0].latLng.lat
        let longitude = response.data.results[0].locations[0].latLng.lng
        let weatherUrl = `https://api.darksky.net/forecast/${WEATHER_API_KEY}/${latitude},${longitude}?units=auto`
        return axios.get(weatherUrl)
    })
    .then((response) => {
        let temperature = response.data.currently.temperature
        let apparentTemperature = response.data.currently.apparentTemperature
        console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`)
    })
    .catch((e) => {
        console.log(e.message)
    })
