const path = require('path');
const express = require('express');
const hbs = require('hbs');

const { geocode } = require('./utils/geocode');
const { forecast } = require('./utils/forecast');


const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname, '../templates/views');
const partialsDirPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirPath);
hbs.registerPartials(partialsDirPath)

// Define static directory to be served
app.use(express.static(publicDirPath));

app.get(``, (req, res) => {
    res.render(`index`, {
        title: `Weather`,
        name: `Ioana M`
    });
});

app.get(`/about`, (req, res) => {
    res.render(`about`, {
        title: `About me`,
        name: `Ioana M`
    });
});

app.get(`/help`, (req, res) => {
    res.render(`help`, {
        title: `Help`,
        message: `What can I do for you?`,
        name: `Ioana M`
    });
});

app.get(`/weather`, (req, res) => {

    const { address } = req.query;

    const sendErrorRes = error => {
        res.send({ error })
    };

    if (!address) {
        return sendErrorRes(`You must provide an address.`);
    }

    geocode(address, (error, { location, lat, lng } = {}) => {

        if (error) {
            return sendErrorRes(error);
        }

        forecast(lat, lng, (error, forecastData) => {
            if (error) {
                return sendErrorRes(error);
            }

            res.send({
                address,
                forecast: forecastData,
                location
            })
        })
    });
});

app.get(`/help/:helpArticle`, (req, res) => {
    res.render(`404`, {
        title: `Error`,
        error: `Help article ${req.params.helpArticle} not found.`,
        name: `Ioana M`
    });
});

app.get(`*`, (req, res) => {
    res.render(`404`, {
        title: `Error`,
        error: `Page not found.`,
        name: `Ioana M`
    });
});

app.listen(3000, () => {
    console.log(`Server is up on port 3000`);
});