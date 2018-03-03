const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/templates/surveyTemplate');

const keys = require('../config/keys');
const request = require('request');


exports.getSurveys = async (req, res) => {
  const surveys = await Survey.find({ _user: req.user.id }).select({
    recipients: false
  });
  res.send(surveys);
};

exports.sendSurveys = async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const survey = new Survey({
    _user: req.user.id,
    title,
    subject,
    body,
    recipients: recipients.split(',').map((email) => ({ email })),
    dateSent: Date.now()
  });

  // Great place to send an email!
  const mailer = new Mailer(survey, surveyTemplate(survey));

  try {  
    await mailer.send();
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();

    res.send(user);
  } catch (err) {
    res.status(422).send(err);
  }
};