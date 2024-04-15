const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    phoneNumber: String,
    responses: [String]
});

module.exports = mongoose.model('Interview', interviewSchema);
