const mongoose = require('mongoose');

const informationSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
});

module.exports = mongoose.model('Information', informationSchema);