const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    start_date: { type: Date, required: true },
    venue: { type: mongoose.Types.ObjectId, ref: "Venue" },
});

module.exports = mongoose.model('Event', eventSchema);