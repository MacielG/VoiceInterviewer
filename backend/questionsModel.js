const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
    text: String
});

module.exports = mongoose.model('Questions', questionsSchema);
