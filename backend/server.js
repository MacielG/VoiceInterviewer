const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { VoiceResponse } = require('twilio').twiml;
require('dotenv').config();
const Interview = require('./interviewModel');
const Questions = require('./questionsModel');

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/interview', (req, res) => {
    const twiml = new VoiceResponse();
    twiml.say('Hello, thank you for calling. Please answer the following questions after the beep.');

    Questions.find({}, (err, questions) => {
        if (err) {
            console.error('Error retrieving questions:', err);
            return;
        }
        questions.forEach(question => {
            twiml.pause({ length: 1 });
            twiml.say(question.text);
            twiml.record({ maxLength: 120, transcribe: true });
        });

        twiml.hangup();
        res.type('text/xml');
        res.send(twiml.toString());
    });
});

app.get('/api/questions', (req, res) => {
    Questions.find({}, (err, questions) => {
        if (err) {
            res.status(500).send('Error retrieving questions');
            return;
        }
        res.json(questions.map(q => q.text));
    });
});

app.post('/api/questions', (req, res) => {
    const newQuestion = new Questions({ text: req.body.question });
    newQuestion.save(err => {
        if (err) {
            res.status(500).send('Error saving question');
            return;
        }
        res.status(201).send('Question added');
    });
});

app.get('/api/responses', (req, res) => {
    Interview.find({}, (err, interviews) => {
        if (err) {
            res.status(500).send('Error retrieving responses');
            return;
        }
        res.json(interviews);
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
});
