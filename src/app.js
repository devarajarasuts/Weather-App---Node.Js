const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const getForecast = require('./utils/forecast');

const app = express();

//Define path
const publicDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars Engine
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//Setup Static directory to Service
app.use(express.static(publicDir));

app.get('', (req, res, next) => {
    res.render('index', {title: 'Weather', name:'Welcome', myname: 'Devaraj Arasu T S'});
})

app.get('/weather', (req, res, next) => {
const address = req.query.address;
!address ? res.send('Error No address attached') :
geoCode(address, (error, {latitude, longitude, placeName} = {}) => {
error ? res.send({error}) : getForecast(latitude, longitude, (error, {summary, temperature, precipProbability}) => {
        error ? res.send('Incorrect Address information with wrong latitude and longitude') : 
        res.send({
            placeName,
            summary,
            temperature,
            precipProbability
        });
    })
});
;
    
})

app.get('/about', (req, res, next) => {
    res.render('about', {title: 'About Us', name:'Devaraj Arasu T S', myname: 'Devaraj Arasu T S'})
})

app.get('/help', (req, res, next) => {
    res.render('help', {title: 'Help', name:'Help', myname: 'Devaraj Arasu T S'});
})

app.get('/help/*', (req, res) => {
    res.render('404', {title: '404', name: '404', message: 'Error! 404 Help Not Found!', myname: 'Devaraj Arasu T S'});
})

app.use('*', (req, res, next) => {
    res.render('404', {title: '404', name:'404', message: 'Error! 404 Page Not Found', myname: 'Devaraj Arasu T S'});
})

app.listen(3000, () => {
    console.log('Server is Up on port 3000');
});
