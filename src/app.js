const geocode = require('./utilities/geocode')
const forecast = require('./utilities/forecast')
const path= require('path')
const express = require('express')
const hbs = require('hbs')


const app = express() 
const port = process.env.PORT || 3000

//Defining paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

//set up handlebars engine and set up location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.get('',(req,res) =>{
  res.render('index',{
    title : 'Weather',
    name : 'Mechy X'
  })
})

app.get('/about',(req,res) =>{
  res.render('about',{
    name : 'Mechy X',
    title : 'Currently learning NODEjs'
  })
})



app.get('/help',(req,res) =>{
  res.render('help',{
    helpText : 'Enter the location name you wish to know the weather for in the search box.',
    title : 'Help' ,
    name : 'Mechy X'
  })
})


 //setting up handlebar engine to create dynamic
app.get('/weather',(req,res) =>{
if(!req.query.address)
  {
    return res.send({
      error: 'Provide Address'
    })
  }
  
  geocode(req.query.address,(error,{latitude,longitude,location}= {}) =>{
    if(error){
       return res.send({ error })
    }
  
    forecast(latitude,longitude,(error,forecastData) => {
      if(error){
      return res.send({error})
      }
        
      res.send({
          address : req.query.address,
          location,
          forecast : forecastData,
        })
      })
    })  
  })
  
  

app.get('/help/*',(req,res) =>{
  res.render('404',{
    title : '404',
    message : 'Help article not found',
    name: 'Mechy X'
  })
})

app.get('*',(req,res) =>{
  res.render('404',{
    title : '404',
    message : 'Page not found',
    name: 'Mechy X'
  })
})

app.listen(port, () =>{
console.log('Server is up on port '+port);

})
