const mongoose = require('mongoose');

const recordSchema = mongoose.Schema({
    date: Date,
    title: String,
    fullArticle: String,
    url: String,
    user: String,
    rating: Number
});

const Record = mongoose.model('Record', recordSchema);
module.exports = Record;