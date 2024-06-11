const mongoose = require('mongoose');

const venueSchema = mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
});

module.exports = mongoose.model('Venue', venueSchema);