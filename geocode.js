const request = require('request')
const API_KEY = ''

let geocodeAddress = ((address, callback) => {
    const URIaddress = encodeURIComponent(address)
    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY}&location=${URIaddress}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect')
        } else {
            let latitude = body.results[0].locations[0].latLng.lat
            let longitude = body.results[0].locations[0].latLng.lng
            callback(undefined, {
                address: body.results[0].locations[0],
                latitude,
                longitude
            })
        }
    })
})

module.exports = { geocodeAddress }