const request=require('request')

const forecast = (latitude, longitude, callback) => {

  const url = 'https://api.darksky.net/forecast/35972b6a44cd0db6090786bed86c6ccc/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si'

  request({url,json : true}, (error,{ body }) => {

    if(error){
      callback('Unable to connect to the weather service',undefined)
    }
    else if(body.error){
      callback('Unable to find location',undefined)
    }
    else {
      callback(undefined,{
        Today : body.daily.data[0].summary,
        CurrentTemperature : body.currently.temperature,
        ChanceOfRain : body.currently.precipProbability
      })
    }

  })


}

module.exports = forecast
