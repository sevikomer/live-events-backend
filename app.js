const express = require('express');
const bodyParser = require('body-parser');
const session = require("cookie-session");
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/event');
const eventApiRoutes = require('./routes/api/eventApi');
const venueRoutes = require('./routes/venue');
const venueApiRoutes = require('./routes/api/venueApi');
const informationRoutes = require('./routes/information');
const informationApiRoutes = require('./routes/api/informationApi');

require("dotenv").config();

mongoose
    .connect(process.env.MONGO_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.set('view engine', 'ejs');

app.use(session({ secret: process.env.SESSION_SECRET_KEY }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/event', eventRoutes);
app.use('/api/event', eventApiRoutes);
app.use('/venue', venueRoutes);
app.use('/api/venue', venueApiRoutes);
app.use('/information', informationRoutes);
app.use('/api/information', informationApiRoutes);



// app.get('/login', function (req, res) {
//     res.render('../views/pages/login');
// });
// app.get('/', function (req, res) {
//     res.render('../views/pages/home');
// });
// app.get('/information', function (req, res) {
//     res.render('../views/pages/information');
// });
// app.get('/event', function (req, res) {
//     res.render('../views/pages/event');
// });
// app.get('/venue', function (req, res) {
//     res.render('../views/pages/venue');
// });

module.exports = app;