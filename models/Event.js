const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    start_date: { type: Date, required: true },
});

module.exports = mongoose.model('Event', eventSchema);