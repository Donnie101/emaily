const mongoose = require('mongoose');
const { recipientSchema } = require('./recipient')

const surveySchema = new mongoose.Schema({
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    body: String,
    subject: String,
    recipients: [recipientSchema],
    yes: {
        type: Number,
        default: 0
    },
    No: {
        type: Number,
        default: 0
    },
    dateSent: Date,
    lastResponded: Date

});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = { Survey };