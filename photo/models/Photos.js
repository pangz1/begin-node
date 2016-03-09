var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Photos_app');

var Schema = new mongoose.Schema({
    name: String,
    path: String
});

module.exports = mongoose.model('Photo', Schema);