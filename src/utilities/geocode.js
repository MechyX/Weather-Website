const request = require('request')


const geocode = (address,callback) => {

  const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWVjaHkiLCJhIjoiY2s0bDd6b2E4MGUzZjNuczh1ZngyZGFhNSJ9._ei4RZ_9ZUKJKK0xfqBj_A'
  request({url, json : true}, (error,{body}) => {

    if(error){
      callback('Unable to connect to the weather service',undefined)
    }
    else if(body.features.length===0){
      callback('Unable to find location',undefined)
    }
    else{
      callback(undefined, {
        location : body.features[0].place_name,
        longitude : body.features[0].center[0],
        latitude  : body.features[0].center[1]
      })


    }
  })
}

module.exports = geocode
